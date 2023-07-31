import { useEffect, useState } from "react";
import { API_AUDIO_PLAY } from "../../baseUrl";
import MyModalReview from "./MyModalReview";
import { userPutReviewVocabulary } from "../../../api/user/UserVocabulary";

const ListenAnswer = ({
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
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    console.log("use Effect listen");
    setModalShow(false);
  }, []);
  useEffect(() => {
    setAudio((audio) => {
      const audio1 = new Audio(API_AUDIO_PLAY + "/" + word.audioWord);
      audio1.play();
      return audio1;
    });
  }, [word]);

  const handlePlayAudioWord = () => {
    audio.play();
  };

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
      <h2>Click vào loa để nghe lại</h2>

      <div className=" d-flex justify-content-center">
        <button onClick={handlePlayAudioWord}>
          <i className="bi bi-volume-up-fill"></i>
        </button>
      </div>
      <br />
      <h4>
        {emptyChar} ({word.type})
      </h4>
      <br />
      <input
        onChange={(e) => handleChangeInput(e.target.value)}
        type="text"
        className="form-control"
        value={inputAnswer}
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
export default ListenAnswer;
