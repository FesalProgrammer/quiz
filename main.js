const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Variable", correct: true },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

let currentQuestionIndex = 0;
let score = 0;
let answeredQuestions = 0;

const welcomeContainer = document.getElementById("welcome-container");
const quizContainer = document.getElementById("quiz-container");
const scoreContainer = document.getElementById("score-container");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const finishBtn = document.getElementById("finish-btn");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const scoreEl = document.getElementById("score");

function showQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;
  answersEl.innerHTML = "";
  currentQuestion.answers.forEach((answer, index) => {
    const answerDiv = document.createElement("div");
    answerDiv.className = "answer";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `answer-${index}`;
    const label = document.createElement("label");
    label.htmlFor = `answer-${index}`;
    label.textContent = answer.text;
    answerDiv.appendChild(checkbox);
    answerDiv.appendChild(label);
    answersEl.appendChild(answerDiv);
  });
  submitBtn.style.display = "inline-block";
  nextBtn.style.display = "none";
  finishBtn.style.display = "inline-block";
}

function checkAnswer() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const checkboxes = document.querySelectorAll(
    '#answers input[type="checkbox"]',
  );
  let correct = true;
  checkboxes.forEach((checkbox, index) => {
    const isChecked = checkbox.checked;
    const isCorrect = currentQuestion.answers[index].correct;
    if (isChecked !== isCorrect) {
      correct = false;
    }
  });
  if (correct) {
    score++;
    alert("Correct!");
  } else {
    alert("Incorrect!");
  }
  answeredQuestions++;
  submitBtn.style.display = "none";
  nextBtn.style.display = "inline-block";
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function finishQuiz() {
  if (submitBtn.style.display !== "none") {
    const confirmFinish = confirm(
      "Aún no has enviado esta pregunta. Finalizar con el puntaje actual?",
    );
    if (!confirmFinish) {
      return;
    }
  }
  showScore();
}

function showScore() {
  quizContainer.style.display = "none";
  scoreContainer.style.display = "block";
  scoreEl.textContent = `Your score: ${score} out of ${answeredQuestions} answered (total ${quizQuestions.length} questions)`;
}

function startQuiz() {
  welcomeContainer.style.display = "none";
  quizContainer.style.display = "block";
  showQuestion();
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  answeredQuestions = 0;
  scoreContainer.style.display = "none";
  welcomeContainer.style.display = "block";
}

submitBtn.addEventListener("click", checkAnswer);
nextBtn.addEventListener("click", nextQuestion);
finishBtn.addEventListener("click", finishQuiz);
startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", restartQuiz);

// Initially show welcome
welcomeContainer.style.display = "block";
quizContainer.style.display = "none";
scoreContainer.style.display = "none";
