import React from "react";
//import { allProjects } from "../data/projects";
import { ProjectType } from "../data/types";
//import { jsPDF } from "jspdf";
import {
  PDFDocument,
  rgb,
  degrees,
  StandardFonts,
  PDFPage,
  PDFFont,
  RGB,
} from "pdf-lib";
//import { v4 as uuidv4 } from "uuid";
import {
  total,
  breakdown,
  //summaries,
} from "../data/results";
import { mileageRate, perDiem } from "../data/config";
//import { UserType } from "../data/types";
//import Name from "./Name";

interface PDFProps {
  projects: ProjectType[];
  name: string;
}

const PDF: React.FC<PDFProps> = ({ projects, name }) => {
  // CONSIDER Deleting?
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(JSON.stringify(projects));
    console.log(projects);
  };

  // Utility function to create a PDF from an image file
  const createPdfFromImage = async (
    imageBytes: ArrayBuffer,
    fileType: string
  ): Promise<Uint8Array> => {
    try {
      const pdfDoc = await PDFDocument.create();
      let image;

      if (fileType === "image/jpeg") {
        image = await pdfDoc.embedJpg(imageBytes);
      } else if (fileType === "image/png") {
        image = await pdfDoc.embedPng(imageBytes);
      } else {
        throw new Error("Unsupported image format");
      }

      const { width, height } = image;
      const page = pdfDoc.addPage([width, height]);
      page.drawImage(image, { x: 0, y: 0, width, height });

      return pdfDoc.save();
    } catch (error) {
      console.error("Error creating PDF from image:", error);
      // Return an empty PDF or placeholder if an error occurs
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([600, 400]); // Arbitrary page size
      page.drawText("Unable to convert this file to PDF.", { x: 50, y: 350 });
      return pdfDoc.save();
    }
  };

  // Function to convert non-PDF files to PDF format
  const convertFileToPdf = async (file: File): Promise<Uint8Array> => {
    const fileBytes = await file.arrayBuffer();
    const fileType = file.type;

    try {
      if (fileType.startsWith("image/")) {
        // If the file is an image, convert it to a PDF
        return createPdfFromImage(fileBytes, fileType);
      } else {
        // For other file types, create a placeholder PDF
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 400]); // Arbitrary page size

        page.drawText(`File: ${file.name}`, { x: 50, y: 350 });
        page.drawText("The file cannot be displayed here.", { x: 50, y: 300 });
        page.drawText("Please refer to the attached file.", { x: 50, y: 250 });

        return pdfDoc.save();
      }
    } catch (error) {
      console.error("Error converting file to PDF:", error);
      // Return an empty PDF or placeholder if an error occurs
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([600, 400]); // Arbitrary page size
      page.drawText("Error processing this file.", { x: 50, y: 350 });
      return pdfDoc.save();
    }
  };

  const getCurrentDate = (): string => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDownloadPDF = async () => {
    const pdfDoc = await PDFDocument.create();

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontSize = 12;
    const lineHeight = fontSize + 4;
    const pageMargin = 50;

    let page = pdfDoc.addPage();
    let currentY = page.getSize().height - pageMargin;

    const logoImageBytes = await fetch("/images/ATEClogo.png").then((res) =>
      res.arrayBuffer()
    );
    const embeddedLogoImage = await pdfDoc.embedPng(logoImageBytes);

    total.value = 0;
    breakdown.forEach((item) => {
      item.sum = 0;
    });

    // Draw ATEC logo
    const drawTitleWithLogo = (
      page: PDFPage,
      logoImage: any,
      rightMargin: number
    ) => {
      const pageWidth = page.getSize().width;

      // Image dimensions: 1883 × 785
      const logoWidth = 125.5;
      const logoHeight = 52.3;

      page.drawImage(logoImage, {
        x: pageWidth - rightMargin - logoWidth,
        y: currentY - logoHeight / 2,
        width: logoWidth,
        height: logoHeight,
      });

      currentY -= logoHeight / 2;
    };

    // Print text with left and right indentation
    const drawTextWithAlignment = (
      page: PDFPage,
      leftText: string,
      rightText: string,
      x: number,
      y: number,
      fontSize: number,
      font: PDFFont,
      color: RGB,
      rightMargin: number
    ) => {
      // Draw the left-aligned text
      page.drawText(leftText, { x, y, size: fontSize, font, color });

      // Calculate the position for the right-aligned text
      const textWidth = font.widthOfTextAtSize(rightText, fontSize);
      const pageWidth = page.getSize().width;
      const rightX = pageWidth - rightMargin - textWidth;

      // Draw the right-aligned text
      page.drawText(rightText, { x: rightX, y, size: fontSize, font, color });
    };

    // Project loop
    projects.forEach((project, index) => {
      if (currentY < lineHeight + pageMargin) {
        page = pdfDoc.addPage();
        currentY = page.getSize().height - pageMargin;
      }
      drawTitleWithLogo(page, embeddedLogoImage, pageMargin);
      currentY -= lineHeight;

      drawTextWithAlignment(
        page,
        `Expense Report`,
        ``,
        pageMargin,
        currentY,
        fontSize,
        boldFont,
        rgb(0, 0, 0),
        pageMargin
      );
      drawTextWithAlignment(
        page,
        ``,
        getCurrentDate(),
        pageMargin,
        currentY,
        fontSize,
        font,
        rgb(0, 0, 0),
        pageMargin
      );
      currentY -= lineHeight;
      drawTextWithAlignment(
        page,
        `Billable: ${project.name} | ${project.number}`,
        ``,
        pageMargin,
        currentY,
        fontSize,
        boldFont,
        rgb(0, 0, 0),
        pageMargin
      );
      drawTextWithAlignment(
        page,
        ``,
        name || `Default User`,
        pageMargin,
        currentY,
        fontSize,
        font,
        rgb(0, 0, 0),
        pageMargin
      );
      currentY -= lineHeight * 3;

      // Expense loop
      drawTextWithAlignment(
        page,
        `Expenses`,
        ``,
        pageMargin,
        currentY,
        fontSize,
        boldFont,
        rgb(0, 0, 0),
        pageMargin
      );
      currentY -= lineHeight * 2;

      project.expenses.forEach((expense, index) => {
        // Mileage Calculation
        if (expense.costCategory === "Mileage") {
          const roundedMileage: number = Number(expense.mileage?.toFixed(1));
          if (expense.mileage !== null) {
            if (expense.roundTrip) {
              total.value += 2 * roundedMileage * mileageRate;
            } else {
              total.value += roundedMileage * mileageRate;
            }
            const exp = breakdown.find(
              (b) => b.category === expense.costCategory
            );
            if (exp) {
              if (expense.roundTrip) {
                exp.sum += 2 * (roundedMileage * mileageRate);
              } else {
                exp.sum += roundedMileage * mileageRate;
              }
            }
          }
          if (expense.roundTrip) {
            expense.cost = 2 * (roundedMileage * mileageRate);
          } else {
            expense.cost = roundedMileage * mileageRate;
          }
        }
        // Per Diem Calculation
        else if (expense.costCategory === "Per Diem") {
          expense.cost = 0;
          if (expense.breakfast) {
            total.value += perDiem.breakfast;
            const exp = breakdown.find(
              (b) => b.category === expense.costCategory
            );
            if (exp) {
              exp.sum += perDiem.breakfast;
            }
            expense.cost += perDiem.breakfast;
          }
          if (expense.lunch) {
            total.value += perDiem.lunch;
            const exp = breakdown.find(
              (b) => b.category === expense.costCategory
            );
            if (exp) {
              exp.sum += perDiem.lunch;
            }
            expense.cost += perDiem.lunch;
          }
          if (expense.dinner) {
            total.value += perDiem.dinner;

            const exp = breakdown.find(
              (b) => b.category === expense.costCategory
            );
            if (exp) {
              exp.sum += perDiem.dinner;
            }
            expense.cost += perDiem.dinner;
          }
        }
        // Standard Cost Category Calculations
        else {
          if (
            expense.cost !== null &&
            typeof expense.cost === "number" &&
            expense.cost >= 0
          ) {
            total.value += expense.cost;
            const exp = breakdown.find(
              (b) => b.category === expense.costCategory
            );
            if (exp) {
              exp.sum += Number(expense.cost);
            }
          } else {
            console.log("Invalid cost input");
          }
        }

        const description =
          (expense.costCategory || "N/A") + " | " + (expense.costCode || "N/A");
        const amount = `$${expense.cost?.toFixed(2) || "0.00"}`;

        //Constuct expense sub description
        let subParts: string[] = [];
        subParts.push(expense.date || "");
        subParts.push(`${expense.purpose || ""}`);
        subParts.push(
          `${
            expense.costCategory === "62-1005-MLJ - Per Diem"
              ? "B: $" +
                (expense.breakfast || 0) +
                " L: $" +
                (expense.lunch || 0) +
                " D: $" +
                (expense.dinner || 0)
              : ""
          }`
        );
        subParts.push(
          `${
            expense.costCategory === "Mileage"
              ? "From " +
                (expense.fromLocation || "N/A") +
                " to " +
                (expense.toLocation || "N/A")
              : ""
          }`
        );
        subParts.push(
          `${
            expense.costCategory === "Mileage"
              ? (Number(expense.mileage).toFixed(1) || "N/A") + " Miles"
              : ""
          }`
        );
        subParts.push(`${expense.description || ""}`);
        let subDescription = "";
        for (let i = 0; i < subParts.length; i++) {
          if (subParts[i] != "") {
            subDescription += subParts[i];
            for (let j = i; j < subParts.length; j++) {
              if (i != j && subParts[j] != "") {
                subDescription += " | ";
                break;
              }
            }
          }
        }

        // Draw the description and amount on the same line
        if (currentY < lineHeight + pageMargin) {
          page = pdfDoc.addPage();
          currentY = page.getSize().height - pageMargin;
        }
        drawTextWithAlignment(
          page,
          description,
          `${amount}`,
          pageMargin,
          currentY,
          fontSize,
          font,
          rgb(0, 0, 0),
          pageMargin
        );
        currentY -= lineHeight;

        //Sub description
        if (currentY < lineHeight + pageMargin) {
          page = pdfDoc.addPage();
          currentY = page.getSize().height - pageMargin;
        }
        let subDescriptionLines = "";
        for (let i = 0; i < subDescription.length; i++) {
          subDescriptionLines += subDescription[i];
          if (i % 100 == 0 && i != 0) {
            if (currentY < lineHeight + pageMargin) {
              page = pdfDoc.addPage();
              currentY = page.getSize().height - pageMargin;
            }
            if (i != subDescription.length && subDescription[i] != " ") {
              subDescriptionLines += "-";
            }
            page.drawText(subDescriptionLines, {
              x: pageMargin,
              y: currentY,
              size: fontSize * 0.8,
              font,
              color: rgb(0.5, 0.5, 0.5), // Grey
            });
            currentY -= lineHeight;
            subDescriptionLines = "";
          }
        }
        if (subDescriptionLines.length != 0) {
          if (currentY < lineHeight + pageMargin) {
            page = pdfDoc.addPage();
            currentY = page.getSize().height - pageMargin;
          }
          page.drawText(subDescriptionLines, {
            x: pageMargin,
            y: currentY,
            size: fontSize * 0.8,
            font,
            color: rgb(0.5, 0.5, 0.5), // Grey
          });
          currentY -= lineHeight;
        }

        // Expense divider line
        if (index !== project.expenses.length - 1) {
          if (currentY < lineHeight + pageMargin) {
            page = pdfDoc.addPage();
            currentY = page.getSize().height - pageMargin;
          }
          const pageWidth = page.getSize().width;
          page.drawLine({
            start: { x: pageMargin, y: currentY },
            end: { x: pageWidth - pageMargin, y: currentY },
            thickness: 1,
            color: rgb(0, 0, 0.7), // Blue
          });
          currentY -= lineHeight;
          currentY -= 0.5 * lineHeight;
        }
      });

      //Print Total
      currentY -= lineHeight;
      if (currentY < lineHeight + pageMargin) {
        page = pdfDoc.addPage();
        currentY = page.getSize().height - pageMargin;
      }
      drawTextWithAlignment(
        page,
        `Total`,
        `$${project.expenses
          .reduce((sum, exp) => sum + (exp.cost || 0), 0)
          .toFixed(2)}`,
        pageMargin,
        currentY,
        fontSize,
        boldFont,
        rgb(0, 0, 0),
        pageMargin
      );
      currentY -= lineHeight;

      // Breakdown
      if (currentY < lineHeight + pageMargin) {
        page = pdfDoc.addPage();
        currentY = page.getSize().height - pageMargin;
      }
      currentY -= lineHeight;
      drawTextWithAlignment(
        page,
        "Breakdown",
        ``,
        pageMargin,
        currentY,
        fontSize,
        font,
        rgb(0, 0, 0),
        pageMargin
      );
      currentY -= lineHeight;

      if (currentY < lineHeight + pageMargin) {
        page = pdfDoc.addPage();
        currentY = page.getSize().height - pageMargin;
      }
      let nonZeroItems = breakdown.filter((item) => item.sum !== 0);
      nonZeroItems.forEach((item) => {
        if (currentY < lineHeight + pageMargin) {
          page = pdfDoc.addPage();
          currentY = page.getSize().height - pageMargin;
        }
        // Breakdown total category
        drawTextWithAlignment(
          page,
          item.category + (item.costCode ? " | " + item.costCode : ""),
          `$${item.sum.toFixed(2) || "0.00"}`,
          pageMargin,
          currentY,
          fontSize * 0.8,
          font,
          rgb(0.5, 0.5, 0.5),
          pageMargin
        );
        currentY -= lineHeight;
      });

      breakdown.forEach((item) => {
        item.sum = 0;
      });

      // New page
      if (index !== projects.length - 1) {
        page = pdfDoc.addPage();
        currentY = page.getSize().height - pageMargin;
      }
    });
    console.log(total.value);
    // Gather all attachment files from all expenses
    const allAttachments = projects.flatMap((project) =>
      project.expenses.flatMap((expense) => expense.attachments || [])
    );

    // Process each attachment
    for (const attachment of allAttachments) {
      if (attachment.file) {
        try {
          const fileBytes = await attachment.file.arrayBuffer();
          const fileType = attachment.file.type;

          let uploadedPdfDoc;

          if (fileType === "application/pdf") {
            // If the file is a PDF, load it directly
            uploadedPdfDoc = await PDFDocument.load(fileBytes);
          } else {
            // Convert non-PDF files to PDF format
            const pdfBytes = await convertFileToPdf(attachment.file);
            uploadedPdfDoc = await PDFDocument.load(pdfBytes);
          }

          // Copy pages from the attachment PDF to the main PDF document
          const copiedPages = await pdfDoc.copyPages(
            uploadedPdfDoc,
            uploadedPdfDoc.getPageIndices()
          );

          const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

          copiedPages.forEach((page) => {
            pdfDoc.addPage(page);

            // Add a "post-it note" annotation to the page
            console.log("text", attachment.text);
            const noteText = attachment.text || "N/A";
            const { width, height } = page.getSize();
            const textSize = 12;
            const padding = 5;

            console.log(width); // used for keeping width variable

            // Measure the width of the text
            const textWidth = font.widthOfTextAtSize(noteText, textSize);
            const textHeight = textSize;

            const boxX = 25;
            const boxY = height - 25;

            // Draw semi-transparent background rectangle
            page.drawRectangle({
              x: boxX - padding,
              y: boxY - padding,
              width: textWidth + padding * 2,
              height: textHeight + padding * 2,
              color: rgb(0, 0, 0),
              opacity: 0.5, // 50% opacity for the background
            });

            page.drawText(noteText, {
              x: 25,
              y: height - 25,
              size: textSize,
              color: rgb(1, 1, 1), // White color for visibility
              rotate: degrees(0), // Rotation
            });
          });
        } catch (error) {
          console.error("Error processing attachment:", error);
        }
      }
    }

    // Save the combined PDF
    const mergedPdfBytes = await pdfDoc.save();
    const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    // Create a link element and trigger a download
    const link = document.createElement("a");
    link.href = url;
    link.download =
      "Expense Report - " + name + " - " + String(getCurrentDate()); // Add name reference
    link.click();
  };

  return (
    <div className="flex space-x-8 justify-center">
      {/* Download PDF button */}
      <button
        className="p-4 bg-ATECblue shadow-md text-white font-bold rounded-md"
        type="button"
        onClick={(event) => {
          handleSubmit(event); // Call handleSubmit to handle form submission
          handleDownloadPDF(); // Then call handleDownloadPDF to generate the PDF
        }}
      >
        Generate Report
      </button>
    </div>
  );
};

export default PDF;
