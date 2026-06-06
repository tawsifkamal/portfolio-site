const express = require("express");
const app = express();
// Disable x-powered-by header for security (prevents leaking technology stack info)
app.disable('x-powered-by');
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
