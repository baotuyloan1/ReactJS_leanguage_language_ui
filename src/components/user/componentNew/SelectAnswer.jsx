import { useState } from "react";
import CardIn4Word from "../CardIn4Word";
import MyModal from "./MyModal";

const SelectAnswer = ({ question, word, nextCb }) => {
  const [modalShow, setModalShow] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const handleClickAnswer = (idAnswer) => {
    console.log(question.idRightAnswer, idAnswer);
    if (idAnswer === question.idRightAnswer) {
      setModalShow(true);
      setIsCorrectAnswer(true);
      console.log("Đúng");
    } else {
      setModalShow(true);
      setIsCorrectAnswer(false);
    }
  };

  return (
    <div class="list-group">
      <MyModal
        isCorrect={isCorrectAnswer}
        word={word}
        playAudio={false}
        handleNext={nextCb}
        show={modalShow}
        handleHide={() => setModalShow(false)}
      />

      <MyModal
        isCorrect={isCorrectAnswer}
        word={word}
        playAudio={false}
        handleNext={nextCb}
        show={modalShow}
        handleHide={() => setModalShow(false)}
      />
      <div>
        <div dangerouslySetInnerHTML={{ __html: question.question }} />
      </div>
      {question.answers.map((answer) => (
        <div>
          <button
            onClick={(e) => handleClickAnswer(answer.id)}
            class="list-group-item list-group-item-action"
          >
            {answer.answer}
          </button>
        </div>
      ))}
    </div>
  );
};

export default SelectAnswer;
