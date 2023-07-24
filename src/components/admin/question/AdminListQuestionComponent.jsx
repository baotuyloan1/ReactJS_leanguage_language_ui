import axios from "axios";
import {useEffect, useState} from "react";
import {Link, useParams, useSearchParams} from "react-router-dom";
import {API_QUESTIONS} from "../../baseUrl";
import {adminGetQuestionsByVocabularyId} from "../../../api/admin/AdminVocabulary";
import {adminDeleteQuestionById, adminGetQuestions} from "../../../api/admin/AdminQuestion";

const AdminListQuestion = () => {
    const [questions, setQuestions] = useState([]);
    const {id} = useParams();
    const [searchParams] = useSearchParams();
    const wordTitle = searchParams.get("word");
    useEffect(() => {
        if (id) {
            adminGetQuestionsByVocabularyId(id).then(response => {
                setQuestions(response.data)
            }).catch(error => console.log(error))
        } else {
            adminGetQuestions().then((response) => {
                console.log(response.data);
                setQuestions(response.data);
            })
                .catch((errors) => console.log(errors));

        }
    }, []);

    const handleDeleteQuestion = (id) => {
        adminDeleteQuestionById(id).then((response) => {
            setQuestions(questions.filter((question) => question.id !== id));
        })
            .catch((errors) => console.log(errors));

    };

    return (
        <div className="container-fluid">
            <h2 className="text-center">{wordTitle ? `Danh sách câu hỏi của từ ${wordTitle}` : `Danh sách các câu hỏi`}</h2>

            <br/>
            <br/>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Câu hỏi</th>
                    <th>Câu trả lời đúng</th>
                    <th>Id từ vựng</th>
                    <th>Từ vựng</th>
                    <th>Các câu trả lời</th>
                    <th>Action</th>
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
                                    dangerouslySetInnerHTML={{__html: question.question}}
                                ></div>
                            </td>
                            <td>{question.rightAnswer.answer}</td>
                            <td>{question.vocabulary.id}</td>
                            <td>{question.vocabulary.word}</td>
                            <td>{question.answers.map(answer => <div>{answer.id + " - " + answer.answer}</div>)}</td>
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

export default AdminListQuestion;
