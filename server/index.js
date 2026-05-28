const express = require("express");
const app = express();
// 🛡️ Sentinel: Security enhancement - Disable X-Powered-By header to prevent leaking tech stack info
app.disable('x-powered-by');
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
