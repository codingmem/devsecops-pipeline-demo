const express = require('express');
const { exec } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;

// VULNERABILITY: Hardcoded secret (Semgrep will catch this)
const API_SECRET = 'sk-prod-a1b2c3d4e5f6g7h8i9j0';

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});
// VULNERABILITY: SQL injection pattern (Semgrep will catch this)
app.get('/search', (req, res) => {
  const userInput = req.query.q;
  const query = "SELECT * FROM products WHERE name = '" + userInput + "'";
  // In a real app this would execute against a database
  res.json({ query: query, results: [] });
});
// VULNERABILITY: Command injection (Semgrep will catch this)
app.get('/ping', (req, res) => {
  const host = req.query.host;
  exec('ping -n 1 ' + host, (error, stdout, stderr) => {
    if (error) {
      res.status(500).json({ error: stderr });
      return;
    }
    res.json({ output: stdout });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;