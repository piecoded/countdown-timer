// Select elements
const dateInput = document.getElementById("date-input");
const timeInput = document.getElementById("time-input");
const startButton = document.getElementById("start-button");
const countdownDisplay = document.getElementById("countdown");

const daysSpan = document.getElementById("days");
const hoursSpan = document.getElementById("hours");
const minutesSpan = document.getElementById("minutes");
const secondsSpan = document.getElementById("seconds");

let countdownInterval; // To store the interval ID

// Function to start countdown
function startCountdown() {
    clearInterval(countdownInterval); // Clear any previous countdown

    // Get values from inputs
    const selectedDate = dateInput.value;
    const selectedTime = timeInput.value;

    // Validate input
    if (!selectedDate || !selectedTime) {
        alert("Please select both a date and a time!");
        return;
    }

    // Get current date & selected date without time
    const today = new Date().toISOString().split("T")[0]; // Get today's date in "YYYY-MM-DD" format
    const targetDateTime = new Date(`${selectedDate}T${selectedTime}`);

    // Check if the selected time is in the future
    if (selectedDate === today) {
        const now = new Date();
        const selectedHours = parseInt(selectedTime.split(":")[0]);
        const selectedMinutes = parseInt(selectedTime.split(":")[1]);

        if (selectedHours < now.getHours() || (selectedHours === now.getHours() && selectedMinutes <= now.getMinutes())) {
            alert("Please select a future time!");
            return;
        }
    }

    if (targetDateTime <= new Date()) {
        alert("Please select a future date and time!");
        return;
    }

    // Start countdown
    countdownInterval = setInterval(() => updateCountdown(targetDateTime), 1000);
}

// update countdown display
function updateCountdown(targetDateTime) {
    const now = new Date();
    const timeDifference = targetDateTime - now;

    if (timeDifference <= 0) {
        clearInterval(countdownInterval);
        countdownDisplay.innerHTML = "🎉 Countdown Over!";
        return;
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    daysSpan.textContent = days.toString().padStart(2, "0");
    hoursSpan.textContent = hours.toString().padStart(2, "0");
    minutesSpan.textContent = minutes.toString().padStart(2, "0");
    secondsSpan.textContent = seconds.toString().padStart(2, "0");
}

startButton.addEventListener("click", startCountdown);
