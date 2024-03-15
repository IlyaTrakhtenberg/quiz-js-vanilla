export const parag = (text) => `<p>${text}</p>`;
export const button = (name) => `<button>${name}</button>`;
export const prog = (current, total, status) =>
  `<div class='progress-bar'><div class='progress-value ${
    status ? "gain" : ""
  }' 
  style='
    width:calc(100%*${current / total});
    --prev-width:calc(100%*${current > 1 ? (current - 1) / total : 0})
  '></div></div>`;
export const question = (quest, answs, selectedAnsw) =>
  `<div>${parag(quest)}
  <form class='answers-form'>
    ${answs
      .map(
        (answer, ind) =>
          checkCol(selectedAnsw, answer, ind) + answerCol(answer, ind)
      )
      .join("")}
  </form></div>`;
export const result = (score, total, grades) =>
  parag(score + "/" + total) + comm(score / total, grades);
const answerCol = (answer, ind) =>
  `<label class='answer' data-correct=${answer.correct} for='answ${ind}'>${answer.text}</label>`;
const checkCol = (selectedAnsw, answer, ind) => `
${
  selectedAnsw
    ? `${
        selectedAnsw === `answ${ind}`
          ? `<img alt='icon' src='./icons/${
              answer.correct ? "correct" : "incorrect"
            }.png'>`
          : `${
              answer.correct
                ? `<img alt='icon' src='./icons/correct.png'>`
                : "<br>"
            }`
      }`
    : `<input type='radio' name='answer' id='answ${ind}' data-correct=${answer.correct}>`
}`;
const comm = (rate, grades) => {
  let comm;
  switch (parseInt(rate * 3)) {
    case 0:
      comm = grades.lo;
      break;
    case 1:
      comm = grades.av;
      break;
    default:
      comm = grades.hi;
      break;
  }
  return parag(comm);
};
