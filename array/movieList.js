// Prompt 1: Create four arrays, each containing 4 movie titles for Comedy, Action, Drama, and Sci-Fi genres.
const comedyMovies = [
  "Superbad",
  "The Hangover",
  "Step Brothers",
  "Bridesmaids"
];

const actionMovies = [
  "Mad Max: Fury Road",
  "John Wick",
  "Die Hard",
  "The Dark Knight"
];

const dramaMovies = [
  "The Shawshank Redemption",
  "Forrest Gump",
  "Fight Club",
  "The Godfather"
];

const sciFiMovies = [
  "Inception",
  "The Matrix",
  "Interstellar",
  "Blade Runner 2049"
];

// Prompt 2: Assign the correct movie titles to a movieList array based on the selection.
let selectedGenre = "Action"; // Change this value to test other genres
let movieList = [];

if (selectedGenre === "Comedy") {
  movieList = comedyMovies;
} else if (selectedGenre === "Action") {
  movieList = actionMovies;
} else if (selectedGenre === "Drama") {
  movieList = dramaMovies;
} else if (selectedGenre === "Sci-Fi") {
  movieList = sciFiMovies;
}

console.log("Prompt 2 - movieList:", movieList);

// Prompt 3: Push movie titles directly to movieList inside the conditionals (no separate arrays)
selectedGenre = "Drama"; // Change this value to test other genres
movieList = [];

if (selectedGenre === "Comedy") {
  movieList.push("Superbad", "The Hangover", "Step Brothers", "Bridesmaids");
} else if (selectedGenre === "Action") {
  movieList.push("Mad Max: Fury Road", "John Wick", "Die Hard", "The Dark Knight");
} else if (selectedGenre === "Drama") {
  movieList.push("The Shawshank Redemption", "Forrest Gump", "Fight Club", "The Godfather");
} else if (selectedGenre === "Sci-Fi") {
  movieList.push("Inception", "The Matrix", "Interstellar", "Blade Runner 2049");
}

console.log("Prompt 3 - movieList:", movieList);
