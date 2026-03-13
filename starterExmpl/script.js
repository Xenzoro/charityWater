let packingList = [];
let cloudy = true;

if (cloudy) {
    packingList.push("umbrella"); // push appends "umbrella" to the end of the packingList array
} else {
    packingList.push("sunglasses"); // push appends "sunglasses" to the end of the packingList array
}
let tempF = 66;
if (tempF < 50) {
  packingList.push("jacket");
} else if (tempF < 65) {
  packingList.push("sweater");
} else {
    packingList.push("water bottle");
}

console.log("Your weather-based packing list is:\n" + packingList);
