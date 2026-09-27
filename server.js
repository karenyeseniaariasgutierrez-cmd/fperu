const express = require("express");
const path = require("path");

const app = express();
const port = Number(process.env.PORT) || 8080;
const root = __dirname;

app.use("/css", express.static(path.join(root, "css")));
app.use("/js", express.static(path.join(root, "js")));
app.use("/assets", express.static(path.join(root, "assets")));

app.get("/", (_req, res) => {
  res.sendFile(path.join(root, "index.html"));
});

app.get("/sabadell", (_req, res) => {
  res.sendFile(path.join(root, "sabadell.html"));
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
