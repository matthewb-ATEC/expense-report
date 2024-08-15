import Project from "./Project";
import React, { useEffect, useState } from "react";
import { allProjects } from "../Data/projects";
import { jsPDF } from "jspdf";
import { PDFDocument } from "pdf-lib";

interface Attachment {
  projectId: number;
  expenseId: number;
  file: File;
}

const Home: React.FC = () => {
  // List of all projecst created by the user to track expenses
  const [projects, setProjects] = useState([{ id: 0 }]);

  // State to store the uploaded file (Temporary)
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  // Adds a new default project to the overall list
  const addProject = () => {
    const newProject = { id: projects[projects.length - 1].id + 1 }; // Simple ID generation based on length
    setProjects([...projects, newProject]);
  };

  // Removes the selected project from the overall list
  const removeProject = (id: number) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic
  };

  // Handles file upload
  const handleFileUpload = (
    projectId: number,
    expenseId: number,
    files: File[]
  ) => {
    const newAttachments = files.map((file) => ({
      projectId,
      expenseId,
      file,
    }));
    setAttachments([...attachments, ...newAttachments]);
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
          *****Project {project.id}*****
          <Project allProjects={allProjects} onFileUpload={handleFileUpload} />
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
