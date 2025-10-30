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
    question: "Wo spielt Manchster United",
    answers: ["La Liga", "Bundesliga", "Premier Liga", "Seria A"],
    correct: 2,
  },
  {
    question: "Welche Farbe hat die Karte für eine Verwarnung?",
    answers: ["Blau", "Rot", "Gelb", "Grün"],
    correct: 2,
  },
];
// questions.map((q) => q.question).forEach((q) => console.log(q));

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

  // console.log("Loaded question:", q.question);
}

function checkAnswer(selected) {
  if (answered) return;
  answered = true;

  const buttons = answersEl.querySelectorAll("button");
  const correctIndex = questions[currentQuestion].correct;
  // console.log("Selected:", selected, " Correct:", correctIndex);

  if (selected === correctIndex) {
    // console.log(" Correct");
    buttons[selected].classList.add("correct");
    score++;
    scoreEl.textContent = `Score ${score}`;
  } else {
    // console.log("Wrong");
    buttons[selected].classList.add("wrong");
    buttons[correctIndex].classList.add("correct");
    alert("Falsh");
  }
}

function showAnswer() {
  if (currentQuestion < 0 || answered) return;
  answered = true;

  const buttons = answersEl.querySelectorAll("button");
  const correctIndex = questions[currentQuestion].correct;
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
  questionEl.textContent = "Druck Weiter";
  answersEl.innerHTML = "";

  const restartBtn = document.getElementById("restart");
  if (restartBtn) restartBtn.remove();
}

backBtn.addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  } else {
    console.log(Back);
  }
});

forwardBtn.addEventListener("click", () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion();
  } else {
    console.log(Forward);
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
