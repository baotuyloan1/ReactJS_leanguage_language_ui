import { useEffect, useState } from "react";
import MyModalReview from "./MyModalReview";
import { userPutSelectVocabulary } from "../../../api/user/UserVocabulary";
import { useNavigate } from "react-router-dom";

const SelectAnswer = ({
  word,
  setWords,
  setCurrentWord,
  words,
  setIndexWord,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setModalShow(false);
  }, []);
  console.log(word, "Bao");

  const handleClickAnswer = (idAnswer) => {
    userPutSelectVocabulary({
      idQuestion: word.learnTypes[0].idQuestion,
      idAnswer: idAnswer,
    }).then((res) => {
      if (res.data.learnAgain) {
        setIsCorrectAnswer(false);
      } else {
        setIsCorrectAnswer(true);
      }
      setModalShow(true);
    });
  };

  return (
    <div className="list-group">
      <MyModalReview
        word={word}
        isCorrect={isCorrectAnswer}
        isShowModal={modalShow}
        setShowModal={setModalShow}
        words={words}
        setCurrentWord={setCurrentWord}
        setIndexWord={setIndexWord}
        setWords={setWords}
      />

      <div>
        <div
          dangerouslySetInnerHTML={{
            __html: word.learnTypes[0].question,
          }}
        />
      </div>
      {word.learnTypes[0]?.answers.map((answer) => (
        <div key={answer.id}>
          <button
            onClick={(e) => handleClickAnswer(answer.id)}
            className="list-group-item list-group-item-action"
          >
            {answer.answer}
          </button>
        </div>
      ))}
    </div>
  );
};

export default SelectAnswer;
