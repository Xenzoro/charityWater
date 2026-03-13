// get refrences to the form and suggestion section
const weatherForm = document.getElementById('weatherForm');
const suggestionSection = document.getElementById('suggestion');

// add event listener to handel form submission
weatherForm.addEventListener('submit', function(event) {
    event.preventDefault(); // prevent form from submitting normally

    // get the selected values from weather and temperature
    const weather = document.getElementById('weather').value;
    const temperature = parseInt(document.getElementById('temperature').value, 10);

    // initialize a suggestion message
    let suggestion = '';

    // Determine the suggestion based on the weather
    if (weather === 'cloudy' || weather === 'rainy') {
        suggestion = `It's ${weather}! A light jacket might be a good idea. 🧥`;
        if (weather === 'rainy') {
            suggestion += ' Don\'t forget your umbrella! ☔️';
        }
    } else if (weather === 'sunny') {
        suggestion = "It's sunny! 😎 Don't forget your sunglasses and sunscreen! 🕶️☀️";
    } else if (weather === 'snowy') {
        suggestion = "Snowy weather ahead! ❄️ Wear a warm coat, gloves, and boots! 🧤🧣🥾";
    } else if (weather === 'windy') {
        suggestion = "It's windy! 💨 A windbreaker or hoodie is a good idea! 🧥";
    } else {
        suggestion = "Please select a weather type.";
    }

    // Add temperature-based suggestion for cold weather
    if (!isNaN(temperature) && temperature < 50) {
        // Only add warm jacket advice if not already covered by snowy
        if (weather !== 'snowy') {
            suggestion += " It's chilly! Wear a warm jacket. 🧥";
        }
    } else if (!isNaN(temperature) && temperature > 85) {
        suggestion += " It's hot! 🥵 Stay hydrated and wear light clothes. 💧👕";
    }

    // Display the suggestion
    suggestionSection.innerHTML = `<p>${suggestion}</p>`;
});
