export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { q = "algérie" } = req.query;

  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(q)}&lang=fr&country=dz&max=10&token=${process.env.GNEWS_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.message || "Erreur API" });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Erreur serveur", details: error.message });
  }
}
