import { useEffect, useState } from "react";
import MyModal from "./MyModalReview";
import axios from "axios";

const MeanAnswer = ({ word, nextCb, cbSetIsCorrect }) => {
  const [modalShow, setModalShow] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [inputAnswer, setInputAnswers] = useState();
  const emptyChar = word.word.replace(/./g, "_ ");
  const regex = new RegExp(word.word, "i");
  const emptySentence = word.sentence.replace(regex, emptyChar);

  useEffect(() => {
    console.log('use Effect mean')
    setModalShow(false);
  }, []);
  const handleChangeInput = (value) => {
    setInputAnswers(value);
  };
  const handleCheckInput = () => {
    if (inputAnswer) {
      if (word.word.toUpperCase() === inputAnswer.toUpperCase()) {
        setModalShow(true);
        setIsCorrectAnswer(true);
        console.log("Đúng");
      } else {
        axios
          .post(
            "http://localhost:8080/api/user/updateVocabulary",
            { idVocabulary: word.id, rightAnswer: false },
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log(res);
            return true;
          })
          .catch((error) => {
            // if (error.response && error.response.status === 401) {
            //   alert("Sai tên đăng nhập hoặc mật khẩu");
            // }
            console.log(error);
          });
        cbSetIsCorrect(false);
        setModalShow(true);
        setIsCorrectAnswer(false);
      }
    } else {
    }
  };
  return (
    <div>
      <MyModal
        isCorrect={isCorrectAnswer}
        word={word}
        playAudio={false}
        handleNext={nextCb}
        show={modalShow}
        handleHide={() => setModalShow(false)}
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
