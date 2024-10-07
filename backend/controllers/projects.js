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
        response.json(
          report.projects.find((project) => project.id === projectId)
        );
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
  const project = request.body;

  Report.findById(reportId)
    .then((report) => {
      report.projects.push(project);
      response.status(201).json(project);
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
