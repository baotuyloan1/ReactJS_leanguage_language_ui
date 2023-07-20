import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_QUESTIONS } from "../../baseUrl";
import { error } from "jquery";

const ListQuestion = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios
      .get(API_QUESTIONS)
      .then((response) => {
        console.log(response.data);
        setQuestions(response.data);
      })
      .catch((errors) => console.log(errors));
  }, []);

  const handleDeleteQuestion = (id) => {
    axios
      .delete(API_QUESTIONS + `/${id}`)
      .then((response) => {
        setQuestions(questions.filter((question) => question.id !== id));
      })
      .catch((errors) => console.log(errors));
  };

  return (
    <div className="container-fluid">
      <h2 className="text-center">Course List</h2>

      <br />
      <br />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Câu hỏi</th>
            <th>Câu trả lời đúng</th>
            <th>Id từ vựng</th>
            <th>Từ vựng</th>
            <th>Action </th>
          </tr>
        </thead>
        <tbody>
          {questions &&
            questions.length > 0 &&
            questions.map((question) => (
              <tr key={question.id}>
                <td>{question.id}</td>

                <td>
                  <div
                    dangerouslySetInnerHTML={{ __html: question.question }}
                  ></div>
                </td>
                <td>{question.answer?.answer}</td>
                <td>{question.vocabulary.id}</td>
                <td>{question.vocabulary.word}</td>
                <td>
                  <Link className="btn btn-primary me-2">
                    Chỉnh sửa câu hỏi
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={(e) => handleDeleteQuestion(question.id)}
                  >
                    {" "}
                    Xóa câu hỏi
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListQuestion;
