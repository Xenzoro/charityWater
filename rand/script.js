// Get the buttons from the HTML by their IDs
const rockButton = document.getElementById("rock");
const paperButton = document.getElementById("paper");
const scissorsButton = document.getElementById("scissors");

// Function to randomly select Rock, Paper, or Scissors for the computer
function getComputerChoice() {
  const choices = ["Rock", "Paper", "Scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

// Use the result div that is now always present in the HTML
let resultDiv = document.getElementById("result");

// Function to play a round: takes player's choice, generates computer's choice, displays both
function playRound(playerChoice) {
  const computerChoice = getComputerChoice();
  // Add emojis for each choice
  const emojiMap = {
    "Rock": "🪨",
    "Paper": "📄",
    "Scissors": "✂️"
  };

  // Determine winner
  let resultMsg = "";
  if (playerChoice === computerChoice) {
    resultMsg = "It's a tie! 🤝";
  } else if (
    (playerChoice === "Rock" && computerChoice === "Scissors") ||
    (playerChoice === "Paper" && computerChoice === "Rock") ||
    (playerChoice === "Scissors" && computerChoice === "Paper")
  ) {
    resultMsg = "You win! 🎉";
  } else {
    resultMsg = "Computer wins! 💻";
  }

  resultDiv.innerHTML =
    `<p>You chose: <strong>${playerChoice} ${emojiMap[playerChoice]}</strong></p>` +
    `<p>Computer chose: <strong>${computerChoice} ${emojiMap[computerChoice]}</strong></p>` +
    `<p><strong>${resultMsg}</strong></p>`;
}

// Add event listener for rock button
rockButton.addEventListener("click", function() {
  playRound("Rock");
});

// Add event listener for paper button
paperButton.addEventListener("click", function() {
  playRound("Paper");
});

// Add event listener for scissors button
scissorsButton.addEventListener("click", function() {
  playRound("Scissors");
});