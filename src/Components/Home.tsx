import Project from "./Project";
import React, { useState } from "react";
import { allProjects } from "../Data/projects";
import { Project as ProjectType } from "../Data/types";
import { jsPDF } from "jspdf";
import ATEClogo from "../Data/ATEClogo.png";
import {
  PDFDocument,
  rgb,
  degrees,
  StandardFonts,
  PDFPage,
  PDFFont,
} from "pdf-lib";
import { v4 as uuidv4 } from "uuid";
import {
  total,
  totalTaxed,
  totalUntaxed,
  breakdown,
  summaries,
  mileageRate,
} from "../Data/results";
import { User as UserType } from "../Data/types";

const Home: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [projects, setProjects] = useState<ProjectType[]>([]);

  interface UserProps {
    user: UserType;
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value); // Update state when input changes
  };

  const addProject = () => {
    const newProject: ProjectType = {
      id: uuidv4(),
      projectNumber: "",
      expenses: [
        {
          id: uuidv4(),
          date: "",
          costCategory: "",
          costCode: "",
          attachments: [],
        },
      ],
    };

    setProjects([...projects, newProject]);
  };

  const removeProject = (id: string) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  const handleProjectUpdate = (updatedProject: any) => {
    setProjects(
      projects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project
      )
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // calculate(projects); // for the refactor into Calculations.tsx
    console.log(JSON.stringify(projects));
    console.log(projects);
    total.value = 0;
    totalTaxed.value = 0;
    totalUntaxed.value = 0;
    breakdown.forEach((item) => {
      item.sum = 0;
    });

    for (let p = 0; p < projects.length; p++) {
      for (let e = 0; e < projects[p].expenses.length; e++) {
        let expense = projects[p].expenses[e];
        if (expense.costCategory === "Mileage") {
          console.log("mileage", expense.mileage, typeof expense.mileage);
          if (expense.mileage !== null) {
            total.value += Number(expense.mileage) * mileageRate;
            totalTaxed.value += Number(expense.mileage) * mileageRate;
            const exp = breakdown.find(
              (b) => b.category === expense.costCategory
            );
            if (exp) {
              exp.sum += Number(expense.mileage) * mileageRate;
            }
          }
        } else if (expense.costCategory === "62-1005-MLJ - Per Diem") {
          if (expense.breakfast !== null) {
            total.value += Number(expense.breakfast);
            totalTaxed.value += Number(expense.breakfast);
            const exp = breakdown.find(
              (b) => b.category === expense.costCategory
            );
            if (exp) {
              exp.sum += Number(expense.breakfast);
            }
          }
          if (expense.lunch !== null) {
            total.value += Number(expense.lunch);
            totalTaxed.value += Number(expense.lunch);
            const exp = breakdown.find(
              (b) => b.category === expense.costCategory
            );
            if (exp) {
              exp.sum += Number(expense.lunch);
            }
          }
          if (expense.dinner !== null) {
            total.value += Number(expense.dinner);
            totalTaxed.value += Number(expense.dinner);
            const exp = breakdown.find(
              (b) => b.category === expense.costCategory
            );
            if (exp) {
              exp.sum += Number(expense.dinner);
            }
          }
        } else {
          if (
            expense.cost !== null &&
            typeof expense.cost === "number" &&
            expense.cost >= 0
          ) {
            total.value += expense.cost;
            if (
              expense.costCategory === "62-1011-TRV - Reimbursable Gas" &&
              expense.taxable === false
            ) {
              totalUntaxed.value += expense.cost;
            } else {
              totalTaxed.value += expense.cost;
            }
            const exp = breakdown.find(
              (b) => b.category === expense.costCategory
            );
            if (exp) {
              exp.sum += Number(expense.cost);
            }
          }
        }

        // update breakdown
      }
    }

    console.log("total: ", total.value);
    console.log("total taxed: ", totalTaxed.value);
    console.log("total untaxed: ", totalUntaxed.value);
    console.log(breakdown);
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

    const logoImageBytes = await fetch(ATEClogo).then((res) =>
      res.arrayBuffer()
    );
    const embeddedLogoImage = await pdfDoc.embedPng(logoImageBytes); // Use embedJpg if JPEG

    // Draw the "EXPENSE REPORT" title and logo on the same line
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
      rightMargin: number
    ) => {
      // Draw the left-aligned text
      page.drawText(leftText, { x, y, size: fontSize, font });

      // Calculate the position for the right-aligned text
      const textWidth = font.widthOfTextAtSize(rightText, fontSize);
      const pageWidth = page.getSize().width;
      const rightX = pageWidth - rightMargin - textWidth;

      // Draw the right-aligned text
      page.drawText(rightText, { x: rightX, y, size: fontSize, font });
    };

    // Projects
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
        name,
        pageMargin,
        currentY,
        fontSize,
        boldFont,
        pageMargin
      );
      currentY -= lineHeight;
      drawTextWithAlignment(
        page,
        `Billable: ${project.projectNumber}`,
        getCurrentDate(),
        pageMargin,
        currentY,
        fontSize,
        boldFont,
        pageMargin
      );
      currentY -= lineHeight * 3;

      project.expenses.forEach((expense) => {
        const description =
          `${
            expense.costCode &&
            (expense.costCategory === "Mileage" ||
              expense.costCategory === "Other")
              ? expense.costCode + " - "
              : ""
          }` + (expense.costCategory || "N/A");
        const amount = `$${expense.cost?.toFixed(2) || "0.00"}`;

        //Constuct expense sub description
        let subParts: string[] = [];
        subParts.push(expense.date || "");
        subParts.push(
          `${
            !expense.taxable &&
            expense.costCategory === "62-1011-TRV - Reimbursable Gas"
              ? "Untaxed"
              : ""
          }`
        );
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
              ? "From: " +
                (expense.fromLocation || "N/A") +
                " To: " +
                (expense.toLocation || "N/A")
              : ""
          }`
        );
        subParts.push(`${expense.description || ""}`);

        console.log("subParts: ", subParts);
        let subDescription = "";

        for (let i = 0; i < 6; i++) {
          if (subParts[i] != "") {
            subDescription += subParts[i];
            for (let j = i; j < 6; j++) {
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
      });

      //Print Total
      if (currentY < lineHeight + pageMargin) {
        page = pdfDoc.addPage();
        currentY = page.getSize().height - pageMargin;
      }
      drawTextWithAlignment(
        page,
        `Total:`,
        `$${project.expenses
          .reduce((sum, exp) => sum + (exp.cost || 0), 0)
          .toFixed(2)}`,
        pageMargin,
        currentY,
        fontSize,
        boldFont,
        pageMargin
      );
      if (index !== projects.length - 1) {
        page = pdfDoc.addPage();
        currentY = page.getSize().height - pageMargin;
      }
    });

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

          copiedPages.forEach((page, pageIndex) => {
            pdfDoc.addPage(page);

            // Add a "post-it note" annotation to the page
            console.log("text", attachment.text);
            const noteText = attachment.text || "N/A";
            const { width, height } = page.getSize();
            const textSize = 12;
            const padding = 5;

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
      "Expense Report - " + name + " - " + String(getCurrentDate());
    link.click();
  };

  return (
    <div className="flex p-8 bg-gray-100 justify-center items-center">
      <form className="flex flex-col self-center space-y-8">
        <div className="p-8 bg-white border-gray-100 border-2 rounded-md shadow-sm">
          <div className="flex flex-col w-full items-start space-y-2">
            <label className="text-gray-600" htmlFor="name">
              Full Name
            </label>
            <input
              className="p-2 w-full border-grey-300 border-b-2"
              type="text"
              id="name"
              name="name"
              value={name} //Bind to state
              onChange={handleNameChange} // Update state on input change
            />
          </div>
        </div>

        {projects.map((project) => (
          <div
            className="flex space-x-8 items-start p-8 bg-white shadow-sm border-gray-100 border-2 rounded-md"
            key={project.id}
          >
            <Project
              project={project}
              allProjects={allProjects}
              updateProject={handleProjectUpdate}
            />
            <button
              className="text-red-500 font-bold text-nowrap"
              type="button"
              onClick={() => removeProject(project.id)}
            >
              Remove Project
            </button>
          </div>
        ))}

        <button
          className="w-full self-center p-2 bg-white shadow-sm rounded-md text-ATECblue font-bold"
          type="button"
          onClick={addProject}
        >
          Add Project
        </button>

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
      </form>
    </div>
  );
};

export default Home;
