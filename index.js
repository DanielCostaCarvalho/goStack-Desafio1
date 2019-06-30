const express = require('express');

const server = express();

server.use(express.json);

const projects = [];

server.post('/projects', (req, res) => {
  const { id, title } = req.body;
  projects.push({ 'id': id, 'title': title, tasks: [] });
  return res.json(projects);
});

server.get('/projects', (req, res) => {
  return res.json(projects);
});