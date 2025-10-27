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
    question: "Wer ist der Trainer von Manchester City (2025)?",
    answers: [
      "Pep Guardiola",
      "Jürgen Klopp",
      "Zinedine Zidane",
      "Carlo Ancelotti",
    ],
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
    question: "Was ist die Hauptstadt von Deutschland?",
    answers: ["Hamburg", "München", "Berlin", "Hannover"],
    correct: 2,
  },
  {
    question: "Welche Farbe hat die Karte für eine Verwarnung?",
    answers: ["Blau", "Rot", "Gelb", "Grün"],
    correct: 2,
  },
];

let currentQuestion = -1;
let answered = false;
let score = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next");
const showAnswerBtn = document.getElementById("showAnswer");

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
}
