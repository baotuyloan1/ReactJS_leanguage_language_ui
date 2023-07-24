import {useEffect, useState} from "react";
import {Link, useSearchParams} from "react-router-dom";
import {API_VOCABULARIES, RESOURCE_IMG_WORD_URL} from "../../baseUrl";
import "../../../styles/admin/ListWord.css";
import {adminDeleteVocabularyById, adminGetVocabularies} from "../../../api/admin/AdminVocabulary";
import {adminGetVocabulariesByTopicid} from "../../../api/admin/AdminTopic";

const AdminWordsComponent = () => {
    const [words, setWords] = useState([]);
    const [searchParams] = useSearchParams();

    const topicId = searchParams.get("topicId");
    const topicName = searchParams.get("topicName");
    useEffect(() => {
        if (topicId) {
            adminGetVocabulariesByTopicid(topicId).then((res) => {
                setWords(res.data)
            }).catch(error => console.log(error))
        } else {
            adminGetVocabularies()
                .then((res) => {
                    setWords(res.data);
                })
                .catch((err) => console.log(err));
        }
    }, [searchParams]);

    const handleDelete = (id) => {
        adminDeleteVocabularyById(id).then(res => setWords(words => words.filter(word => word.id !== id))).catch(err => console.log(err))
    }

    return (<div className="container-fluid">
        <h2 className="text-center">{topicName && `Danh sách các từ vựng của topic ${topicName}`}</h2>
        <h2 className="text-center">{!topicName && `Danh sách các từ vựng`}</h2>
        <br/>
        <br/>
        <table className="table table-bordered">
            <thead>
            <tr>
                <th>ID</th>
                <th>Word</th>
                <th>TopicName</th>
                <th>Image</th>
                <th>IPA</th>
                <th>Meaning Word</th>
                <th>Type</th>
                <th>Sentence</th>
                <th>Meaning Sentence</th>
                <th style={{width: 200}}>Audio Word</th>
                <th style={{width: 200}}>Audio Sentence</th>
                <th>Added date</th>
                <th>Question</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {words.length > 0 && words.map((word) => (<tr key={word.id}>
                <td>{word.id}</td>
                <td>{word.word}</td>
                <td>{word.topic.titleEn}</td>
                <td>
                    <img src={`${RESOURCE_IMG_WORD_URL}/${word.img}`}></img>
                </td>
                <td>{word.ipa}</td>
                <td>{word.meaningWord}</td>
                <td>{word.type}</td>
                <td>{word.sentence}</td>
                <td>{word.meaningSentence}</td>
                <td>
                    <video
                        style={{padding: "0px", marginTop: "-40px"}}
                        controls
                        width="100%"
                    >
                        <source
                            src={API_VOCABULARIES + "/" + `playAudio/${word.audioWord}`}
                            type="audio/mpeg"
                        ></source>
                    </video>
                </td>
                <td>
                    <video
                        style={{padding: "0px", marginTop: "-40px"}}
                        controls
                        width="100%"
                    >
                        <source
                            src={API_VOCABULARIES + "/" + `playAudio/${word.audioSentence}`}
                            type="audio/mpeg"
                        ></source>
                    </video>
                </td>
                <td>{word.addedDate}</td>
                <td>

                    <Link
                        to={`/admin/questions/create/${word.id}?word=${word.word}`}
                        className="btn btn-primary"
                    >
                        Tạo
                    </Link>
                    <Link
                        to={`/admin/words/${word.id}/questions?word=${word.word}`}
                        className="btn btn-warning"
                    >
                        Các câu hỏi
                    </Link>
                </td>

                <td>
                    <button type="button" className="btn btn-danger" onClick={e => handleDelete(word.id)}>
                        Xóa
                    </button>
                </td>
            </tr>))}
            </tbody>
        </table>
    </div>);
};

export default AdminWordsComponent;
