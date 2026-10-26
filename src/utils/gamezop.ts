const token = process.env.gamezop_bearer_token;

export async function getGames() {
  try {
    const response = await fetch("https://api.gamezop.com/v3/games", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      next: { revalidate: 3600 }
    });

    const result = await response.json();

    return {
      data: result?.data || result || []
    };

  } catch (error) {
    console.error("Error fetching games:", error);
    return { data: [] };
  }
}

