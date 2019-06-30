const express = require("express");

const server = express();

server.use(express.json());

const projects = [];

let reqNumber = 0;

function findProjectPositionById(id) {
  positionInProjectsArray = projects.findIndex(project => project.id == id);
  return positionInProjectsArray;
}

function checkProjectId(req, res, next) {
  const projectId = req.params.id;
  req.projectId = findProjectPositionById(projectId);
  if (req.projectId == -1) {
    return res.status(400).json({ error: "This id does not exists" });
  }

  return next();
}

server.use((req, res, next) => {
  console.log(++reqNumber);
  next();
});

server.post("/projects", (req, res) => {
  const { id, title } = req.body;
  projects.push({ id: id, title: title, tasks: [] });
  return res.json(projects);
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.put("/projects/:id", checkProjectId, (req, res) => {
  const { title } = req.body;
  const projectId = req.projectId;

  projects[projectId].title = title;

  return res.json(projects[projectId]);
});

server.delete("/projects/:id", checkProjectId, (req, res) => {
  const { projectId } = req.projectId;

  projects.splice(projectId, 1);

  return res.json(projects);
});

server.post("/projects/:id/tasks", checkProjectId, (req, res) => {
  const projectId = req.projectId;
  const { title } = req.body;

  projects[projectId].tasks.push(title);

  return res.json(projects[projectId]);
});

server.listen(3000);
