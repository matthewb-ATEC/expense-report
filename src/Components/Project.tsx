import React, { useState } from "react";
import Expense from "./Expense";
import { ProjectType } from "./Types";

const Project: React.FC = () => {
  const [projects, setProjects] = useState<ProjectType[]>([
    {
      projectNumber: "001",
      projectName: "Project One",
      expenses: [
        {
          costCategory: "Materials",
          costCode: "1001",
          amount: 500,
          attachments: [],
        },
      ],
    },
  ]);

  const updateExpenseAttachments = (
    projectIndex: number,
    expenseIndex: number,
    attachments: File[]
  ) => {
    const updatedProjects = [...projects];
    updatedProjects[projectIndex].expenses[expenseIndex].attachments =
      attachments;
    setProjects(updatedProjects);
  };

  return (
    <div>
      {projects.map((project, projectIndex) => (
        <div key={project.projectNumber}>
          <h3>{project.projectName}</h3>
          {project.expenses.map((expense, expenseIndex) => (
            <Expense
              key={expenseIndex}
              expense={expense}
              projectIndex={projectIndex}
              expenseIndex={expenseIndex}
              updateExpenseAttachments={updateExpenseAttachments}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Project;
