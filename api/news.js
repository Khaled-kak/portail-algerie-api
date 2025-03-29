// api/news.js
export default async (req, res) => {
  // Solution temporaire (à remplacer après test)
  const API_KEY = process.env.GNEWS_API_KEY || "dee563bf7cc2ba0481029c7af0b11ec8";
  
  // Debug
  console.log("Clé API utilisée :", API_KEY?.substring(0, 3) + "...");

  try {
    const url = `https://gnews.io/api/v4/top-headlines?token=${API_KEY}&lang=fr&country=dz`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) throw new Error(data.message || data.errors?.join(', ') || "Erreur API");
    
    return res.status(200).json({
      success: true,
      articles: data.articles || []
    });
    
  } catch (error) {
    console.error("ERREUR COMPLÈTE:", error);
    return res.status(500).json({ 
      error: "Impossible de charger les actualités",
      details: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};
