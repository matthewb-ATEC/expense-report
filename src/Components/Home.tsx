import Project from "./Project";
import React, { useEffect, useState } from "react";
import { allProjects } from "../Data/projects";
import { jsPDF } from "jspdf";
import { PDFDocument } from "pdf-lib";

const Home: React.FC = () => {
  // List of all projecst created by the user to track expenses
  const [projects, setProjects] = useState([{ id: 0 }]);

  // State to store the uploaded file (Temporary)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

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

  const handleDownloadPDF = async () => {
    if (uploadedFile) {
      // If a file is uploaded, append it to the "Hello World" PDF
      const uploadedPdfBytes = await uploadedFile.arrayBuffer();
      const uploadedPdfDoc = await PDFDocument.load(uploadedPdfBytes);

      //Data
      const doc = new jsPDF();
      doc.text("Report data here", 10, 10);
      const jsPdfBytes = doc.output("arraybuffer");
      const jsPdfDoc = await PDFDocument.load(jsPdfBytes);

      const copiedPages = await jsPdfDoc.copyPages(
        uploadedPdfDoc,
        uploadedPdfDoc.getPageIndices()
      );
      copiedPages.forEach((page) => jsPdfDoc.addPage(page));

      const mergedPdfBytes = await jsPdfDoc.save();
      const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "merged_report.pdf";
      link.click();
    } else {
      // If no file is uploaded, just download the "Hello World" PDF
      const doc = new jsPDF();
      doc.text("Hello World", 10, 10);
      doc.save("report.pdf");
    }
  };

  // Handles file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setUploadedFile(file);
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
          <Project allProjects={allProjects} />
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

      {/* File Upload Section */}
      <div>
        <input type="file" onChange={handleFileUpload} />
        {uploadedFile && <p>File Uploaded: {uploadedFile.name}</p>}
      </div>

      {/* Add the Download PDF button */}
      <button type="button" onClick={handleDownloadPDF}>
        PDF
      </button>
    </form>
  );
};

export default Home;
