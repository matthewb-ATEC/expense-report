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

  const handleDownloadPDF = async () => {
    const doc = new jsPDF();

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();

    // Gather all attachment files from all expenses
    const allAttachments = projects.flatMap((project) =>
      project.expenses.flatMap((expense) => expense.attachments || [])
    );

    // Process each attachment
    for (const attachment of allAttachments) {
      if (attachment.file) {
        try {
          // Load the attachment file
          const fileBytes = await attachment.file.arrayBuffer();
          const uploadedPdfDoc = await PDFDocument.load(fileBytes);

          // Copy pages from the attachment PDF to the main PDF document
          const copiedPages = await pdfDoc.copyPages(
            uploadedPdfDoc,
            uploadedPdfDoc.getPageIndices()
          );
          copiedPages.forEach((page) => pdfDoc.addPage(page));
        } catch (error) {
          console.error("Error loading or merging PDF:", error);
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
