// Scrapping episodio  

    async function fetchLatestEpisode() {
        const feedUrl = "https://www.ivoox.com/feed_fg_f11795912_filtro_1.xml"; // Feed real de tu podcast

        try {
            const response = await fetch(feedUrl);
            const text = await response.text();
            const parser = new DOMParser();
            const xml = parser.parseFromString(text, "text/xml");

            const latestEpisode = xml.querySelector("item"); // Obtiene el último episodio
            if (!latestEpisode) {
                document.getElementById("episode-title").textContent = "¡Ups! No se encontró ningún episodio.";
                return;
            }

            const title = latestEpisode.querySelector("title").textContent;
            const link = latestEpisode.querySelector("link").textContent; // URL del episodio

            // Extraer el ID del episodio desde el enlace de iVoox
            const match = link.match(/_(\d+)_/);
            if (!match) {
                document.getElementById("episode-title").textContent = "No se pudo obtener el ID del episodio.";
                return;
            }

            const episodeId = match[1]; // Extraemos el ID del episodio

            // Generamos la URL del iframe con el nuevo episodio
            const iframeUrl = `https://www.ivoox.com/player_ej_${episodeId}_6_1.html?c1=62067e`;

            // Actualizamos el título y el iframe en la web
            document.getElementById("episode-title").textContent = "¡Dale al play y agárrate! La maniobra comienza en 3, 2, 1... 🚀🎶";
            document.getElementById("podcast-iframe").src = iframeUrl;

        } catch (error) {
            console.error("Error obteniendo el feed RSS:", error);
            document.getElementById("episode-title").textContent = "Error al cargar el episodio.";
        }
    }

    fetchLatestEpisode();
