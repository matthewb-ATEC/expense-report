import Project from "./Project";
import React, { useState } from "react";
import { allProjects } from "../Data/projects";
import { Project as ProjectType } from "../Types";
import { jsPDF } from "jspdf";
import { PDFDocument } from "pdf-lib";

interface Attachment {
  id: string;
  projectId: number;
  expenseId: number;
  file: File;
}

const Home: React.FC = () => {
  const [projects, setProjects] = useState<ProjectType[]>([
    {
      id: 0,
      projectNumber: 0,
      projectName: "",
      expenses: [
        {
          id: 0,
          date: "",
          costCategory: "",
          costCode: "",
        },
      ],
    },
  ]);

  const addProject = () => {
    const newProjectId =
      projects.length > 0 ? projects[projects.length - 1].id + 1 : 0;

    const newProject: ProjectType = {
      id: newProjectId,
      projectNumber: 0,
      projectName: "",
      expenses: [
        {
          id: 0,
          date: "",
          costCategory: "",
          costCode: "",
        },
      ],
    };

    setProjects([...projects, newProject]);
  };

  const removeProject = (id: number) => {
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

  // Handles file upload
  const handleFileUpload = (
    projectId: number,
    expenseId: number,
    files: File[]
  ) => {
    console.log(
      `Uploading files for Project ${projectId}, Expense ${expenseId}`
    );
    const newAttachments = files.map((file) => ({
      id: `${projectId}-${expenseId}-${file.name}-${Date.now()}`, // Create a unique ID for each attachment
      projectId,
      expenseId,
      file,
    }));
    setAttachments([...attachments, ...newAttachments]);
  };

  const handleDeleteAttachment = (attachmentId: string) => {
    setAttachments(
      attachments.filter((attachment) => attachment.id !== attachmentId)
    );
  };

  const handleDownloadPDF = async () => {
    // Create a new PDF document
    const doc = new jsPDF();
    doc.text("Hello World", 10, 10);
    console.log(attachments);
    if (attachments.length > 0) {
      // Load existing attachments into PDF
      const basePdfBytes = doc.output("arraybuffer");
      const basePdfDoc = await PDFDocument.load(basePdfBytes);

      for (const attachment of attachments) {
        const fileBytes = await attachment.file.arrayBuffer();
        const uploadedPdfDoc = await PDFDocument.load(fileBytes);

        const copiedPages = await basePdfDoc.copyPages(
          uploadedPdfDoc,
          uploadedPdfDoc.getPageIndices()
        );
        copiedPages.forEach((page) => basePdfDoc.addPage(page));
      }

      // Save the final merged PDF
      const mergedPdfBytes = await basePdfDoc.save();
      const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "merged_report.pdf";
      link.click();
    } else {
      doc.save("report.pdf");
    }
  };

  // Handles file upload
  const handleFileUpload = (
    projectId: number,
    expenseId: number,
    files: File[]
  ) => {
    console.log(
      `Uploading files for Project ${projectId}, Expense ${expenseId}`
    );
    const newAttachments = files.map((file) => ({
      id: `${projectId}-${expenseId}-${file.name}-${Date.now()}`, // Create a unique ID for each attachment
      projectId,
      expenseId,
      file,
    }));
    setAttachments([...attachments, ...newAttachments]);
  };

  const handleDeleteAttachment = (attachmentId: string) => {
    setAttachments(
      attachments.filter((attachment) => attachment.id !== attachmentId)
    );
  };

  const handleDownloadPDF = async () => {
    // Create a new PDF document
    const doc = new jsPDF();
    doc.text("Hello World", 10, 10);
    console.log(attachments);
    if (attachments.length > 0) {
      // Load existing attachments into PDF
      const basePdfBytes = doc.output("arraybuffer");
      const basePdfDoc = await PDFDocument.load(basePdfBytes);

      for (const attachment of attachments) {
        const fileBytes = await attachment.file.arrayBuffer();
        const uploadedPdfDoc = await PDFDocument.load(fileBytes);

        const copiedPages = await basePdfDoc.copyPages(
          uploadedPdfDoc,
          uploadedPdfDoc.getPageIndices()
        );
        copiedPages.forEach((page) => basePdfDoc.addPage(page));
      }

      // Save the final merged PDF
      const mergedPdfBytes = await basePdfDoc.save();
      const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "merged_report.pdf";
      link.click();
    } else {
      doc.save("report.pdf");
    }
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
          <br />
          <br />
        </div>
      ))}

      <button type="button" onClick={addProject}>
        Add Project
      </button>
      <br />
      <br />
      <br />

      {/* Add the Download PDF button */}
      <button type="button" onClick={handleDownloadPDF}>
        PDF
      </button>
    </form>
  );
};

export default Home;
