const questions = [
  {
    question: "Wer gewann die Fussball-WM 2018?",
    answers: ["Brasilien", "Frankreich", "Argentinien", "Kroatien"],
    correct: 1,
  },
  {
    question: "Welcher Spieler hat die meisten Tore in der Champions League?",
    answers: [
      "Lionel Messi",
      "Cristiano Ronaldo",
      "Robert Lewandowski",
      "Kylian Mbappé",
    ],
    correct: 1,
  },
  {
    question: "Wo fand die WM 2018 statt?",
    answers: ["Russland", "Brasilien", "Katar", "Südafrika"],
    correct: 0,
  },
  {
    question: "Wie viele Spieler hat eine Fussballmannschaft auf dem Feld?",
    answers: ["9", "10", "11", "12"],
    correct: 2,
  },
  {
    question: "Welcher Manschaft gewann 2020 die Champions League?",
    answers: ["Liverpool", "PSG", "Bayern München", "Real Madrid"],
    correct: 2,
  },
  {
    question: "Wer war der Trainer von Manchester United in 2008?",
    answers: ["Ferguson", "Jürgen Klopp", "Zinedine Zidane", "Carlo Ancelotti"],
    correct: 0,
  },
  {
    question: "Welches Land gewann die erste Fussball-WM 1930?",
    answers: ["Italien", "Uruguay", "Deutschland", "Brasilien"],
    correct: 1,
  },
  {
    question: "Wie lange dauert ein Fussballspiel normalerweise?",
    answers: ["60 Minuten", "90 Minuten", "100 Minuten", "80 Minuten"],
    correct: 1,
  },
  {
    question: "Wo spielt Manchester United?",
    answers: ["La Liga", "Bundesliga", "Premier Liga", "Seria A"],
    correct: 2,
  },
  {
    question: "Welche Farbe hat die Karte für eine Verwarnung?",
    answers: ["Blau", "Rot", "Gelb", "Grün"],
    correct: 2,
  },
];

questions.forEach((q) => (q.userAnswer = null));

let currentQuestion = -1;
let answered = false;
let score = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next");
const showAnswerBtn = document.getElementById("showAnswer");
const scoreEl = document.getElementById("score");
const backBtn = document.getElementById("back");
const forwardBtn = document.getElementById("forward");

function loadQuestion() {
  answered = false;
  answersEl.innerHTML = "";
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;

  q.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.addEventListener("click", () => checkAnswer(index));
    answersEl.appendChild(btn);
  });

  if (q.userAnswer !== null) {
    answered = true;
    const buttons = answersEl.querySelectorAll("button");
    const correctIndex = q.correct;

    if (q.userAnswer === correctIndex) {
      buttons[q.userAnswer].classList.add("correct");
    } else {
      buttons[q.userAnswer].classList.add("wrong");
      buttons[correctIndex].classList.add("correct");
    }
  }
}

function checkAnswer(selected) {
  const q = questions[currentQuestion];

  if (answered || q.userAnswer !== null) return;
  answered = true;

  const buttons = answersEl.querySelectorAll("button");
  const correctIndex = q.correct;

  q.userAnswer = selected;

  if (selected === correctIndex) {
    buttons[selected].classList.add("correct");
    score++;
    scoreEl.textContent = `Score: ${score}`;
  } else {
    buttons[selected].classList.add("wrong");
    buttons[correctIndex].classList.add("correct");
    alert("Falsch");
  }
}

function showAnswer() {
  if (currentQuestion < 0) return;
  const q = questions[currentQuestion];
  if (answered) return;

  answered = true;
  const buttons = answersEl.querySelectorAll("button");
  const correctIndex = q.correct;
  buttons[correctIndex].classList.add("correct");
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    questionEl.textContent = "Hier ist das Ende";
    scoreEl.textContent = `Dein Score: ${score}`;
    answersEl.innerHTML = "";
    showRestartButton();
  }
}

function showRestartButton() {
  if (document.getElementById("restart")) return;
  const restartBtn = document.createElement("button");
  restartBtn.textContent = "Neustart";
  restartBtn.id = "restart";
  restartBtn.addEventListener("click", restartQuiz);
  document.querySelector(".buttons").appendChild(restartBtn);
}

function restartQuiz() {
  currentQuestion = -1;
  score = 0;
  scoreEl.textContent = "Score: 0";
  questionEl.textContent = "Drück Weiter";
  answersEl.innerHTML = "";

  questions.forEach((q) => (q.userAnswer = null));

  const restartBtn = document.getElementById("restart");
  if (restartBtn) restartBtn.remove();
}

backBtn.addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
});

forwardBtn.addEventListener("click", () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentQuestion === -1) {
    currentQuestion = 0;
    loadQuestion();
  } else {
    nextQuestion();
  }
});

showAnswerBtn.addEventListener("click", showAnswer);

// Github
