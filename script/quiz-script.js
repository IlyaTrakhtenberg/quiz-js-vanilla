import quizData from "./quiz-data.js";
import shuffle from "./utils.js";
import { parag, button, prog, question, result } from "./quiz-elements.js";
const mainRef = document.querySelector("main");
const btnRef = () => document.querySelector("button");
const inpRefs = () => Array.from(document.querySelectorAll("input"));
const answRefs = () => Array.from(document.querySelectorAll(".answer"));
const renderContent = (elements) => {
  mainRef.innerHTML = elements;
};

const initialStage = () => {
  renderContent(parag(quizData.legend) + button("Start quiz"));
  btnRef().onclick = quizStage;
};

const quizStage = () => {
  let [num, score] = [0, 0];
  const quiz = shuffle(quizData.quiz);
  const total = quiz.length;
  const setQuestion = () => {
    const [quest, answs] = [quiz[num].question, shuffle(quiz[num].answers)];
    renderContent(question(quest, answs, null) + prog(num, total, false));
    inpRefs().forEach(
      (inp) =>
        (inp.onchange = (e) => {
          num++;
          renderContent(
            question(quest, answs, e.target.id) +
              prog(num, total, true) +
              button(num < total ? "Next question" : "Finish quiz")
          );
          const correct = JSON.parse(e.target.dataset.correct);
          correct && score++;
          document
            .querySelector(".answers-form")
            .classList.add(correct ? "green" : "red");
          answRefs()
            .filter(
              (answ) =>
                answ.getAttribute("for") !== e.target.id &&
                !JSON.parse(answ.dataset.correct)
            )
            .forEach((answ) => answ.classList.add("muted"));
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
