const express = require("express");

const server = express();

server.use(express.json());

const projects = [];

server.post("/projects", (req, res) => {
  const { id, title } = req.body;
  projects.push({ id: id, title: title, tasks: [] });
  return res.json(projects);
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.put("/projects/:id", (req, res) => {
  const { title } = req.body;
  const { id } = req.params;

  positionInProjectsArray = projects.findIndex(project => project.id == id);

  projects[positionInProjectsArray].title = title;

  return res.json(projects[positionInProjectsArray]);
});

server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  positionInProjectsArray = projects.findIndex(project => project.id == id);

  projects.splice(positionInProjectsArray, 1);

  return res.json(projects);
});

server.post("/projects/:id/tasks", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  positionInProjectsArray = projects.findIndex(project => project.id == id);

  projects[positionInProjectsArray].tasks.push(title);

  return res.json(projects[positionInProjectsArray]);
});

server.listen(3000);
