const express = require("express");
const cors = require("cors");
const { projects, workExperiences } = require("./data.js");
const app = express();
const port = 3000;

app.use(cors());

app.get("/api/projects", (req, res) => {
  res.json(projects);
});

app.get("/api/work-experiences", (req, res) => {
  res.json(workExperiences);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
