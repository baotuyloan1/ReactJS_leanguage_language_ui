import { useEffect, useState } from "react";
import { API_USER_SAVE_LEARNED_WORD } from "../baseUrl";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SelectAnswer from "./componentNew/SelectAnswer";
import ListenAnswer from "./componentNew/ListenAnswer";
import MeanAnswer from "./componentNew/MeanAnswer";
import axios from "axios";
import { userGetVocabulariesByTopicId } from "../../api/user/UserTopic";
import CardIn4Word from "./CardIn4Word";
import { toast, ToastContainer } from "react-toastify";

const LearnNewWord = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [words, setWords] = useState([]);
  const [type, setType] = useState(0);
  const [indexWord, setIndexWord] = useState(0);
  const [numberTypes, setNumberTypes] = useState();
  const [isLast, setIsLast] = useState();
  const [process, setProcess] = useState(0);

  const { state } = useLocation();
  useEffect(() => {
    setWords(state);
    userGetVocabulariesByTopicId(id)
      .then((response) => {
        if (response.data.length > 0) {
          setNumberTypes(() => response.data[0].learnTypes.length - 1);
          setWords(response.data);
        } else {
          alert("Bạn đã học hết các từ của topic này");
          if (window.confirm) {
            navigate(-1);
          }
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response?.status === 401) {
          navigate("/auth/login");
        }
      });
  }, []);

  const handleAddLearnedWord = async (idWord) => {
    console.log(idWord);
    axios
      .post(
        API_USER_SAVE_LEARNED_WORD,
        { idVocabulary: idWord },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success("🦄 Đã thêm từ vựng vào sổ tay!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          alert("Sai tên đăng nhập hoặc mật khẩu");
        }
        console.log(error);
      });

    //   fetch(API_USER_SAVE_LEARNED_WORD, {
    //     method: "post",
    //     body: JSON.stringify({ idVocabulary: idWord }),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     credentials: "include",
    //   })
    //     .then((res) => console.log(res))
    //     .catch((error) => console.log(error));
    // };

    await axios
      .post(
        "http://localhost:8080/api/user/saveNewWord",
        { idVocabulary: idWord },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        return true;
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          alert("Sai tên đăng nhập hoặc mật khẩu");
        }
        console.log(error);
      });
  };
  const handleCancel = () => {
    navigate("/user/");
  };

  const handleNext = () => {
    console.log(type, numberTypes);
    /**
     * Xảy ra khi type không phải là type cuối cùng
     */
    if (type < numberTypes && !isLast) {
      const typeString = words[indexWord]?.["learnTypes"][type + 1];
      console.log(typeString.type);
      if (typeString.type === "select") {
        setType((type) => {
          const temp = type + 1;
          if (temp === numberTypes && indexWord === words.length - 1) {
            setIsLast(true);
          }
          return temp;
        });
      } else if (typeString.type === "listen") {
        setType((type) => {
          const temp = type + 1;
          if (temp === numberTypes && indexWord === words.length - 1) {
            setIsLast(true);
          }
          return temp;
        });
      } else if (typeString.type === "mean") {
        setType((type) => {
          const temp = type + 1;
          if (temp === numberTypes && indexWord === words.length - 1) {
            setIsLast(true);
          }
          return temp;
        });
      } else {
        setType((type) => {
          const temp = type + 1;
          if (temp === numberTypes && indexWord === words.length - 1) {
            setIsLast(true);
          }
          return temp;
        });
      }

      /**
       * đổi từ khi đến type cuối cùng
       */
    } else if (type === numberTypes && !isLast) {
      setType(0);
      setIndexWord((indexWord) => {
        const index = indexWord + 1;
        setProcess((index / words.length) * 100);
        setNumberTypes(words[indexWord + 1]?.["learnTypes"].length - 1);

        /**
         * sử lý thêm từ đã học
         */
        handleAddLearnedWord(words[indexWord].vocabularyId);

        return indexWord + 1;
      });

      /**
       * Kết thúc từ cuối cùng
       */
    } else {
      setProcess(100);
      if (handleAddLearnedWord(words[indexWord].vocabularyId)) {
        navigate("/user/dashboard");
      }
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {words && words.length > 0 && (
        <div>
          <div className="d-flex flex-row-reverse">
            <button className="col-2" onClick={handleCancel}>
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
          <div
            className="progress mb-5"
            role="progressbar"
            aria-label="Success striped example"
          >
            <div
              className="progress-bar progress-bar-striped bg-success"
              style={{ width: process + "%" }}
            ></div>
          </div>

          {words[indexWord]?.["learnTypes"][type].type === "info" && (
            <CardIn4Word playAudio={true} word={words[indexWord]} />
          )}
          {words[indexWord]?.["learnTypes"][type].type === "select" && (
            <SelectAnswer
              nextCb={handleNext}
              word={words[indexWord]}
              question={words[indexWord]?.["learnTypes"][type]}
            />
          )}
          {words[indexWord]?.["learnTypes"][type].type === "listen" && (
            <ListenAnswer word={words[indexWord]} nextCb={handleNext} />
          )}
          {words[indexWord]?.["learnTypes"][type].type === "mean" && (
            <div>
              <MeanAnswer word={words[indexWord]} nextCb={handleNext} />
            </div>
          )}

          {indexWord < words.length &&
            words[indexWord]?.["learnTypes"][type].type === "info" && (
              <div className="d-flex justify-content-center pt-5">
                <button className="btn btn-primary" onClick={handleNext}>
                  {!isLast ? "next" : "complete"}
                </button>
              </div>
            )}
        </div>
      )}
    </div>
  );
};

export default LearnNewWord;
