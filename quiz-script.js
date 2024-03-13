import quizData from "./quiz-data.js";
import { entering, question } from "./quiz-elements.js";
const cntRef = document.querySelector(".content-area");
const btnRef = document.querySelector(".button-area");

const quiz = () => {
  cntRef.innerHTML = entering;
  btnRef.innerHTML = "Start quiz";
  btnRef.onclick = startQuiz;
};

const startQuiz = () => {};

const finishQuiz = (crct) => {};

quiz();
