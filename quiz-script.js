import quizData from "./quiz-data.js";
import { prg, button, question, result } from "./quiz-elements.js";
const mainRef = document.querySelector("main");
const btnRef = () => document.querySelector("button");
const answRefs = () => document.querySelectorAll("input");

const renderContent = (elements) => {
  mainRef.innerHTML = elements;
};

const initialStage = () => {
  renderContent(prg(quizData.legend) + button("Start quiz"));
  btnRef().onclick = quizStage;
};

const quizStage = () => {
  let [num, score] = [0, 0];
  const quiz = quizData.quiz;
  const total = quizData.quiz.length;
  const setQuestion = () => {
    renderContent(question(quiz[num]), null);
    answRefs().forEach(
      (answ) =>
        (answ.onchange = (e) => {
          renderContent(
            question(quiz[num], e.target.id) +
              button(num < total - 1 ? "Next question" : "Finish quiz")
          );
          num++;
          JSON.parse(e.target.dataset.correct) && score++;
          btnRef().onclick = num < total ? setQuestion : setResult;
        })
    );
  };
  const setResult = () => {
    renderContent(result(score, total, quizData.grades) + button("Try again"));
    btnRef().onclick = initialStage;
  };
  setQuestion();
};

initialStage();
