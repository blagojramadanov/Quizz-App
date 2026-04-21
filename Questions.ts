export type Question = {
  question: string;
  answers: string[];
  correct: number;
  userAnswer: number | null;
};

export const questions: Question[] = [
  {
    question: "Wer gewann die Fussball-WM 2018?",
    answers: ["Brasilien", "Frankreich", "Argentinien", "Kroatien"],
    correct: 1,
    userAnswer: null,
  },
];
