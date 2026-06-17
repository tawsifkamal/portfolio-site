const express = require("express");
const app = express();
const port = 3000;

// 🛡️ Sentinel: Security Enhancement
// Disable x-powered-by header to prevent leaking technology stack information
app.disable('x-powered-by');

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
