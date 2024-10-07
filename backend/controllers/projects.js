const Report = require("../models/report");
const projectsRouter = require("express").Router();

projectsRouter.get("/:reportId/projects", async (request, response, next) => {
  const reportId = request.params.reportId;
  Report.findById(reportId)
    .then((report) => {
      response.json(report.projects);
    })
    .catch((error) => next(error));
});

projectsRouter.get(
  "/:reportId/projects/:projectId",
  async (request, response, next) => {
    const reportId = request.params.reportId;
    const projectId = request.params.projectId;

    Report.findById(reportId)
      .then((report) => {
        // If the report doesn't exist, return a 404 error
        if (!report) {
          return response.status(404).json({ error: "Report not found" });
        }

        const project = report.projects.find(
          (project) => project.id === projectId
        );

        if (!project) {
          return response.status(404).json({
            error: report.projects[0].id,
          });
        }

        // If the project doesn't exist, return a 404 error
        if (!project) {
          return response.status(404).json({ error: "Project not found" });
        }

        // Return the project details
        response.json(project);
      })
      .catch((error) => next(error));
  }
);

projectsRouter.delete(
  "/:reportId/projects/:projectId",
  (request, response, next) => {
    const reportId = request.params.reportId;
    const projectId = request.params.projectId;

    Report.findById(reportId)
      .then((report) => {
        // Filter out the project to delete
        report.projects = report.projects.filter(
          (project) => project.id !== projectId
        );

        response.status(204).end();
      })
      .catch((error) => next(error));
  }
);

projectsRouter.post("/:reportId/projects", (request, response, next) => {
  const reportId = request.params.reportId;

  Report.findById(reportId)
    .then((report) => {
      if (!report) {
        return response.status(404).json({ error: "Report not found" });
      }

      const newProject = request.body; // Capture the project data from the request body

      // Push the new project into the report's projects array
      report.projects.push(newProject);

      // Save the report with the new project
      report
        .save()
        .then((updatedReport) => {
          // Respond with the newly added project
          const addedProject =
            updatedReport.projects[updatedReport.projects.length - 1];
          response.status(201).json(addedProject);
        })
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
});

projectsRouter.put(
  "/:reportId/projects/:projectId",
  (request, response, next) => {
    const updatedProject = request.body;
    const reportId = request.params.reportId;
    const projectId = request.params.projectId;

    Report.findById(reportId)
      .then((report) => {
        // Find the project to update
        report.projects = report.projects.map((project) =>
          project.id === projectId ? updatedProject : project
        );

        const result = report.projects.find(
          (project) => project.id === projectId
        );

        response.status(200).json(result);
      })
      .catch((error) => next(error));
  }
);

module.exports = projectsRouter;
