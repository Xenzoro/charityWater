// Set up event listener for when the user selects a genre
document.getElementById("genre").addEventListener("change", function() {
  // Get the selected genre
  const selectedGenre = document.getElementById("genre").value;

  // Prompt 3: Push movie titles directly to movieList inside the conditionals
  let movieList = [];
  if (selectedGenre === "Comedy") {
    movieList.push("Superbad", "The Hangover", "Step Brothers", "Bridesmaids");
  } else if (selectedGenre === "Action") {
    movieList.push("Mad Max: Fury Road", "John Wick", "Die Hard", "The Dark Knight");
  } else if (selectedGenre === "Drama") {
    movieList.push("The Shawshank Redemption", "Forrest Gump", "Fight Club", "The Godfather");
  } else if (selectedGenre === "Sci-Fi") {
    movieList.push("Inception", "The Matrix", "Interstellar", "Blade Runner 2049");
  }

  // Display the list of movies on the page
  if (movieList.length > 0) {
    document.getElementById("movieRecommendations").innerText = `Enjoy: ${movieList.join(", ")}!`;
  } else {
    document.getElementById("movieRecommendations").innerText = "";
  }
});
