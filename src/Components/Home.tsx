import Project from "./Project";
import React, { useState } from "react";
import { allProjects } from "../Data/projects";
import { Project as ProjectType } from "../Types";
import { jsPDF } from "jspdf";
import { PDFDocument } from "pdf-lib";
import { v4 as uuidv4 } from "uuid";

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
    console.log(JSON.stringify(projects));
    // Send the projects data to the backend or handle it as needed
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

          let pdfBytes: Uint8Array;

          if (fileType === "application/pdf") {
            // If the file is a PDF, merge it into the main document
            const uploadedPdfDoc = await PDFDocument.load(fileBytes);
            const copiedPages = await pdfDoc.copyPages(
              uploadedPdfDoc,
              uploadedPdfDoc.getPageIndices()
            );
            copiedPages.forEach((page) => pdfDoc.addPage(page));
          } else {
            // Convert the file to PDF format
            pdfBytes = await convertFileToPdf(attachment.file);
            const convertedPdfDoc = await PDFDocument.load(pdfBytes);
            const copiedPages = await pdfDoc.copyPages(
              convertedPdfDoc,
              convertedPdfDoc.getPageIndices()
            );
            copiedPages.forEach((page) => pdfDoc.addPage(page));
          }
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
    link.download = "combined_attachments.pdf";
    link.click();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" />
      </div>

      {projects.map((project) => (
        <div key={project.id}>
          <Project
            project={project}
            allProjects={allProjects}
            updateProject={handleProjectUpdate}
          />
          <button type="button" onClick={() => removeProject(project.id)}>
            Remove Project
          </button>
        </div>
      ))}

      <button type="button" onClick={addProject}>
        Add Project
      </button>

      {/* Download PDF button */}
      <button type="button" onClick={handleDownloadPDF}>
        PDF
      </button>

      {/* Submit Form */}
      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
};

export default Home;
