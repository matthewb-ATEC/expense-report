import Project from "./Project";
import React, { useState } from "react";
import { allProjects } from "../Data/projects";
import { Project as ProjectType } from "../Data/Types";
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
