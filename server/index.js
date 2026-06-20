const express = require("express");
const app = express();
// Security Enhancement: Disable the x-powered-by header to prevent Express from leaking
// its presence in HTTP responses. This reduces the risk of targeted attacks.
app.disable('x-powered-by');
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
