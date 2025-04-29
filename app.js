async function getAnime() {
  const url = "https://api.jikan.moe/v4/random/anime";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    const anime = json.data;

    const animeResult = document.getElementById("anime-result");
    animeResult.innerHTML = "";

    const title = document.createElement("h2");
    title.textContent = anime.title_english;

    const image = document.createElement("img");
    image.src = anime.images.jpg.image_url;
    image.alt = anime.title;

    const trailer = document.createElement("p");

    if (anime.trailer && anime.trailer.url) {
      const trailerLink = document.createElement("a");
      trailerLink.href = anime.trailer.url;
      trailerLink.textContent = "Watch Trailer";
      trailerLink.target = "_blank";
      trailer.appendChild(trailerLink);
    } else {
      trailer.textContent = "Trailer: Not available";
    }

    const synopsis = document.createElement("p");
    synopsis.textContent = ` ${anime.synopsis}`;

    const duration = document.createElement("p");
    duration.textContent = `Duration: ${anime.duration}`;

    animeResult.appendChild(title);
    animeResult.appendChild(image);
    animeResult.appendChild(trailer);
    animeResult.appendChild(duration);
    animeResult.appendChild(synopsis);

    console.log(anime);
  } catch (error) {
    console.error("Error fetching anime:", error.message);
  }
}

document.getElementById("get-anime").addEventListener("click", getAnime);
