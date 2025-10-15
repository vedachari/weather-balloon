import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/api/treasure/get/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const url = `https://a.windbornesystems.com/treasure/${id}.json`;
    console.log("Fetching:", url);

    const response = await fetch(url);
    if (!response.ok) {
      console.error("API returned error:", response.status);
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Fetch failed:", err);
    res.status(500).send({ error: err.message });
  }
});

app.listen(5000, () => console.log("Proxy running on http://localhost:5001"));
