const questions = [
    "How do you usually feel right after you wake up?",
    "Think about your last productive day. When did you accomplish the most?",
    "When do you find yourself browsing social media or procrastinating the most?",
    "How does your energy level change throughout the day?",
    "When do you prefer leisure activities or relaxation?"
];

const options = [
    ["Energetic and ready to start the day.", "Need some time to get going, but I pick up speed.", "Really sluggish, not a morning person."],
    ["Knocked out most tasks before lunch.", "Peak productivity was in the afternoon.", "Evening was when I hit my stride."],
    ["Mornings, I just can't seem to start right away.", "Afternoons, I hit a slump and get distracted.", "Nights, I'm too tired to focus on work."],
    ["Starts high in the morning and decreases by night.", "Starts moderate, peaks midday, then decreases.", "Low in the morning, builds up, and peaks in the evening."],
    ["Mornings, I like a slow start to my day.", "Afternoons, I need a break to recharge.", "Evenings, I unwind and relax after a day's work."]
];

const scores = [0, 0, 0]; // Morning, Afternoon, Evening
let currentQuestion = 0;

function displayQuestion() {
    document.getElementById("question").innerText = questions[currentQuestion];
    const answersUl = document.getElementById("answers");
    answersUl.innerHTML = ''; // Clear previous options
    options[currentQuestion].forEach((option, index) => {
        const li = document.createElement("li");
        li.innerText = option;
        li.addEventListener("click", () => selectAnswer(index));
        answersUl.appendChild(li);
    });
}

function selectAnswer(index) {
    scores[index]++;
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        displayQuestion();
    } else {
        displayResult();
    }
}

function displayResult() {
    const maxScoreIndex = scores.indexOf(Math.max(...scores));
    const timesOfDay = ["Morning", "Afternoon", "Evening"];
    const resultDiv = document.getElementById("result");
    resultDiv.innerText = `You're most productive in the ${timesOfDay[maxScoreIndex]}!`;
    console.log("Final scores:", scores);
    document.getElementById("questionnaire").style.display = "none"; // Hide questionnaire
}

document.addEventListener("DOMContentLoaded", displayQuestion);
