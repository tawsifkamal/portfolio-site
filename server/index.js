const express = require("express");
const app = express();

// 🛡️ Sentinel: Security Enhancement - Disable x-powered-by header to prevent information leakage
app.disable('x-powered-by');

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
