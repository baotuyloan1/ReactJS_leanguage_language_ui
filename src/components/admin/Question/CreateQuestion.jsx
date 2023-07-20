import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import axios from "axios";
import { API_COURSES, API_QUESTIONS } from "../../baseUrl";
import InputAnswer from "./InputAnswer";
import { error } from "jquery";

const CreateQuestionComponent = () => {
  const { id } = useParams();
  const [searchParams, setSearchParms] = useSearchParams();
  const [selectAnswers, setSelectAnswers] = useState([]);
  const [inputAnswers, setInputAnswers] = useState([
    { id: 1, text: "", title: "Answer1" },
    { id: 2, text: "", title: "Answer2" },
  ]);
  const [answers, setAnswers] = useState({});

  const [errors, setErrors] = useState([]);
  const [length, setLength] = useState(2);
  const [question, setQuestion] = useState();
  const [indexRightAnswer, setIndexRightAnswer] = useState(0);
  const [typeQuestion, setTypeQuestion] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    var answers = {};
    var selectAnswers = [];
    inputAnswers.forEach((item) => {
      answers[item.id] = item.text;
      selectAnswers.push({ id: item.id, text: item.text });
    });
    setAnswers(answers);
    setSelectAnswers(selectAnswers);
  }, [inputAnswers]);

  const handleChangeAnswer = (id, value) => {
    setAnswers({ ...answers, [id]: value });
    var temp = inputAnswers.map((input) => {
      if (input.id === id) {
        input.text = value;
      }
      return input;
    });
    setInputAnswers(temp);
  };

  const handleChangeQuestion = (title, text) => {
    setQuestion(text);
  };

  const handleValidateForm = () => {
    var errors = [];
    var isValidate = true;

    if (!question || question === "") {
      errors[`question`] = `Question can't be null`;
      isValidate = false;
    }
    Object.keys(answers).forEach((key) => {
      if (!answers[key]) {
        console.log(` answers ${key} can't null`);
        isValidate = false;
        errors[`answer${key}`] = `Answer${key} Can't null`;
      }
    });

    setErrors(errors);
    return isValidate;
  };

  const addNewAnswer = () => {
    const index = inputAnswers.length + 1;
    setInputAnswers((current) => [
      ...current,
      { id: index, text: "", title: `Answer${index}`, length: { length } },
    ]);
    setLength((length) => length + 1);
  };

  const handleSubmit = () => {
    if (handleValidateForm()) {
      var arrayAnswer = [];
      Object.keys(answers).forEach((key) => {
        arrayAnswer.push(answers[key]);
      });
      const object = {
        vocabularyId: id,
        question: question,
        rightAnswer: indexRightAnswer,
        answers: arrayAnswer,
      };

      axios({
        method: "post",
        url: API_QUESTIONS,
        data: object,
      })
        .then((response) => {
          navigate(-1);
        })
        .catch((errors) => {
          console.log(errors);
        });
    }
  };

  const handleDeleteInput = (index) => {
    setInputAnswers((current) => current.filter((item) => item.id != index));
    setLength((length) => length - 1);
  };

  return (
    <div className="">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">
            Tạo câu hỏi cho từ {searchParams.get("word")}
          </h2>
          <form className="row g-3">
            <div className="col-12">
              <label htmlFor="inputEmail4" className="form-label">
                Câu hỏi
              </label>
              <CKEditor
                editor={Editor}
                onChange={(event, editor) =>
                  handleChangeQuestion("question", editor.getData())
                }
                type="text"
                className="form-control"
              />
              <span>{errors["question"]}</span>
            </div>
            <div className="col-12">
              <div className="form-floating">
                <select
                  className="form-select"
                  id="floatingSelect"
                  aria-label="Floating label select example"
                  onChange={(e) => setIndexRightAnswer(e.target.value)}
                >
                  {selectAnswers.map((item) => (
                    <option value={item.id - 1}>
                      Đáp án {item.id} - {item.text}
                    </option>
                  ))}
                </select>
                <label htmlFor="floatingSelect">Select right answer</label>
              </div>
              <span style={{ color: "red" }}>{errors?.["select"]}</span>
            </div>
            {/* 
            <div className="col-6">
              <div className="form-floating">
                <select
                  className="form-select"
                  id="floatingSelect"
                  aria-label="Floating label select example"
                  onChange={(e) => setTypeQuestion(e.target.value)}
                >
                  <option value="1">
                    Chọn nghĩa từ được gạch chân trong 1 câu tiếng anh
                  </option>
                  <option value="2">Chọn từ tiếng anh đúng với nghĩa </option>
                  <option value="3">Chọn từ đúng với câu bị khuyết</option>
                </select>
                <label htmlFor="floatingSelect">Select right answer</label>
              </div>
              <span style={{ color: "red" }}>{errors?.["select"]}</span>
            </div> */}
            {inputAnswers.map((item) => (
              <InputAnswer
                id={item.id}
                text={item.text}
                title={item.title}
                handleChangeInput={handleChangeAnswer}
                handleDeleteInput={handleDeleteInput}
                errors={errors}
                length={length}
              />
            ))}
            <div className="col-1">
              <button
                type="button"
                className="btn btn-primary"
                onClick={(e) => addNewAnswer()}
              >
                Add answer
              </button>
            </div>
            <div className="col-12">
              <button
                type="button"
                className="btn btn-success"
                onClick={handleSubmit}
              >
                Add course
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateQuestionComponent;
