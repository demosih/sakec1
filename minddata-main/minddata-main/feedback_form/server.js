// server.js
const express = require("express");
const path = require("path");
const app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Serve index.html at root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/submit", (req, res) => {
  const { name = "", email = "", rating = "", feedback = "" } = req.body;

  // Trim inputs
  const tName = String(name).trim();
  const tEmail = String(email).trim();
  const tRating = Number(rating);
  const tFeedback = String(feedback).trim();

  // === Backend validation ===

  // Required fields
  if (!tName || !tEmail || !tRating || !tFeedback) {
    return res.send(" Please fill all fields!");
  }

  // Prevent script tags (basic)
  const scriptRegex = /<\s*script\b.*?>.*?<\s*\/\s*script\s*>/i;
  if (scriptRegex.test(tName) || scriptRegex.test(tFeedback)) {
    return res.send(" Script tags are not allowed!");
  }

  // Name validation
  if (!/^[A-Za-z\s]+$/.test(tName)) {
    return res.send(" Invalid name (letters and spaces only).");
  }

  // Email format basic check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(tEmail)) {
    return res.send(" Invalid email format.");
  }

  // Rating range
  if (!Number.isInteger(tRating) || tRating < 1 || tRating > 5) {
    return res.send(" Rating must be an integer between 1 and 5.");
  }

  // Feedback length
  if (tFeedback.length < 10) {
    return res.send(" Feedback is too short.");
  }

  // Simple forbidden-words check to prevent obvious injection payloads
  if (/select|drop|insert|delete|update|--|;|\/\*/i.test(tFeedback)) {
    return res.send(" Feedback contains forbidden words or characters.");
  }

  // Basic HTML-escape before echoing back (avoid reflected XSS)
  function escapeHtml(s) {
    return s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Success response (show escaped values)
  return res.send(`
     Feedback submitted successfully!<br>
    <b>Name:</b> ${escapeHtml(tName)}<br>
    <b>Email:</b> ${escapeHtml(tEmail)}<br>
    <b>Rating:</b> ${escapeHtml(String(tRating))}<br>
    <b>Feedback:</b> ${escapeHtml(tFeedback)}<br>
    <br><a href="/">Submit another</a>
  `);
});

app.listen(3000, () => console.log("🚀 Server running at http://localhost:3000"));