const express = require("express");
const app = express();

// Security: Disable x-powered-by header to prevent framework fingerprinting
app.disable('x-powered-by');

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
