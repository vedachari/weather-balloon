// server.js
import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/api/treasure", async (_, res) => {
  const response = await fetch("https://a.windbornesystems.com/treasure/00.json");
  const text = await response.text();
  res.set("Content-Type", "application/json");
  res.send(text);
});

app.listen(5000, () => console.log("Proxy running on http://localhost:5000"));
