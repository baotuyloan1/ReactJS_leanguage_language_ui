import { useEffect, useState } from "react";
import MyModalReview from "./MyModalReview";
import { userPutReviewVocabulary } from "../../../api/user/UserVocabulary";

const MeanAnswer = ({
  word,
  setWords,
  setCurrentWord,
  words,
  setIndexWord,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [inputAnswer, setInputAnswers] = useState();
  const emptyChar = word.word.replace(/./g, "_ ");
  const regex = new RegExp(word.word, "i");
  const emptySentence = word.sentence.replace(regex, emptyChar);

  useEffect(() => {
    console.log("use Effect mean");
    setModalShow(false);
  }, []);
  const handleChangeInput = (value) => {
    setInputAnswers(value);
  };
  const handleCheckInput = () => {
    if (inputAnswer) {
      userPutReviewVocabulary({
        vocabularyId: word.vocabularyId,
        answer: inputAnswer,
      })
        .then((res) => {
          if (res.data.learnAgain) {
            setIsCorrectAnswer(false);
          } else {
            setIsCorrectAnswer(true);
          }
          setModalShow(true);
          setInputAnswers("");
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div>
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

      <h6>Nhập từ vào chỗ trống</h6>
      <h4>
        {word.meaningWord} ({word.type})
      </h4>
      <h5>{emptyChar}</h5>

      <h5>{word.meaningSentence}</h5>
      <h5>{emptySentence}</h5>

      <br />
      <br />
      <input
        onChange={(e) => handleChangeInput(e.target.value)}
        type="text"
        className="form-control"
        value={}
      />
      <br />
      <div className=" d-flex justify-content-center">
        <button className="btn btn-primary" onClick={handleCheckInput}>
          Check
        </button>
      </div>
    </div>
  );
};

export default MeanAnswer;
