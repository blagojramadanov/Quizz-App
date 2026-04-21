import { questions } from "./Questions.js";

let currentQuestion = -1;
let answered = false;
let score = 0;

const questionEl = document.getElementById("question")!;
const answersEl = document.getElementById("answers")!;
const scoreEl = document.getElementById("score")!;
const nextBtn = document.getElementById("next")!;
const showAnswerBtn = document.getElementById("showAnswer")!;
const backBtn = document.getElementById("back")!;
const forwardBtn = document.getElementById("forward")!;

function loadQuestion() {
  answered = false;
  answersEl.innerHTML = "";

  const q = questions[currentQuestion];
  questionEl.textContent = q.question;

  q.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.onclick = () => checkAnswer(index);
    answersEl.appendChild(btn);
  });
}

function checkAnswer(selected: number) {
  const q = questions[currentQuestion];
  if (answered || q.userAnswer !== null) return;

  answered = true;
  q.userAnswer = selected;

  const buttons = answersEl.querySelectorAll("button");
  const correct = q.correct;

  if (selected === correct) {
    buttons[selected].classList.add("correct");
    score++;
    scoreEl.textContent = `Score: ${score}`;
  } else {
    buttons[selected].classList.add("wrong");
    buttons[correct].classList.add("correct");
  }
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion >= questions.length) {
    questionEl.textContent = "Ende!";
    answersEl.innerHTML = "";
    return;
  }

  loadQuestion();
}

nextBtn.onclick = nextQuestion;

backBtn.onclick = () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
};

forwardBtn.onclick = () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion();
  }
};

showAnswerBtn.onclick = () => {
  const q = questions[currentQuestion];
  const buttons = answersEl.querySelectorAll("button");
  buttons[q.correct].classList.add("correct");
};
