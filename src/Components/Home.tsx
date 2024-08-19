import Project from "./Project";
import React, { useState } from "react";
import { allProjects } from "../Data/projects";
import { Project as ProjectType } from "../Data/Types";
import { jsPDF } from "jspdf";
import { PDFDocument, rgb, degrees, StandardFonts } from "pdf-lib";
import { v4 as uuidv4 } from "uuid";
import {
  total,
  totalTaxed,
  totalUntaxed,
  breakdown,
  summaries,
  mileageRate,
} from "../Data/results";

const Home: React.FC = () => {
  const [projects, setProjects] = useState<ProjectType[]>([
    {
      id: uuidv4(),
      projectNumber: 0,
      projectName: "",
      expenses: [
        {
          id: uuidv4(),
          date: "",
          costCategory: "",
          costCode: "",
          attachments: [],
        },
      ],
    },
  ]);

  const addProject = () => {
    const newProject: ProjectType = {
      id: uuidv4(),
      projectNumber: 0,
      projectName: "",
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
        } else if (expense.costCategory === "Per Diem") {
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
            if (expense.costCategory === "Reimbursable Gas") {
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

  const handleDownloadPDF = async () => {
    const pdfDoc = await PDFDocument.create();

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
            const noteText = `Note`;
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
    link.download = "combined_attachments_with_notes.pdf";
    link.click();
  };

  return (
    <div className="flex h-full justify-center">
      <div className="flex-col self-center">
        <form
          onSubmit={handleSubmit}
          className="my-24 flex-col bg-white self-center space-y-8 p-8 shadow-md rounded-md"
        >
          <div className="flex justify-between items-center">
            <label className="mr-4" htmlFor="name">
              Name
            </label>
            <input
              className="p-2 w-full bg-gray-50 border-grey-300 border-b-2"
              type="text"
              id="name"
              name="name"
            />
          </div>

          {projects.map((project) => (
            <div className="flex flex-col space-y-8" key={project.id}>
              <Project
                project={project}
                allProjects={allProjects}
                updateProject={handleProjectUpdate}
              />
              <button
                className="p-2 bg-red-500 text-white font-bold rounded-md"
                type="button"
                onClick={() => removeProject(project.id)}
              >
                Remove Project
              </button>
            </div>
          ))}

          <button
            className="p-2 bg-blue-500 text-white font-bold rounded-md"
            type="button"
            onClick={addProject}
          >
            Add Project
          </button>

          <div className="flex space-x-8 justify-center">
            {/* Download PDF button */}
            <button
              className="p-4 bg-blue-500 text-white font-bold rounded-md"
              type="button"
              onClick={handleDownloadPDF}
            >
              PDF
            </button>

            {/* Submit Form */}
            <button
              className="p-4 bg-blue-500 text-white font-bold rounded-md"
              type="button"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
