const express = require("express");
const app = express();
// Disable x-powered-by to prevent leaking Express usage
app.disable('x-powered-by');
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
