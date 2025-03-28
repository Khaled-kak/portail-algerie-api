import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.GNEWS_API_KEY;

app.use(cors());

app.get('/news', async (req, res) => {
  const { q = 'algérie', lang = 'fr', country = 'dz', max = 20 } = req.query;

  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(q)}&lang=${lang}&country=${country}&max=${max}&token=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.status !== 200) {
      return res.status(response.status).json({ error: data });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la requête GNews' });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur proxy lancé sur le port ${PORT}`);
});
