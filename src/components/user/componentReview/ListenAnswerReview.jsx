import { useEffect, useState } from "react";
import { API_VOCABULARIES } from "../../baseUrl";
import MyModal from "./MyModalReview";
import axios from "axios";

const ListenAnswer = ({ word, nextCb, cbSetIsCorrect }) => {
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
      const audio1 = new Audio(
        API_VOCABULARIES + "/playAudio/" + word.audioWord
      );
      audio1.play();
      return audio1;
    });
  }, []);

  const handlePlayAudioWord = () => {
    audio.play();
  };

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
        cbSetIsCorrect(false);
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
