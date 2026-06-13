const express = require("express");
const app = express();
app.disable('x-powered-by'); // Security enhancement: Hide Express signature
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
