import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { API_VOCABULARIES, RESOURCE_IMG_WORD_URL } from "../../baseUrl";
import "../../../styles/admin/ListWord.css";
import { adminGetVocabularies } from "../../../api/admin/AdminVocabulary";

const AdminWordsComponent = () => {
  const [words, setWords] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("topicId") !== null) {
    } else {
      adminGetVocabularies()
        .then((res) => {
          setWords(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [searchParams]);
  return (
    <div className="container-fluid">
      <h2 className="text-center">Words List</h2>
      <br />
      <br />
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
            <th>Audio Word</th>
            <th>Audio Sentence</th>
            <th>Added date</th>
            <th>Question</th>
            {/* <th>Action</th> */}
          </tr>
        </thead>
        <tbody>
          {words.length > 0 &&
            words.map((word) => (
              <tr key={word.id}>
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
                    style={{ padding: "0px", marginTop: "-40px" }}
                    controls
                    width="100%"
                  >
                    <source
                      src={
                        API_VOCABULARIES + "/" + `playAudio/${word.audioWord}`
                      }
                      type="audio/mpeg"
                    ></source>
                  </video>
                </td>
                <td>
                  <video
                    style={{ padding: "0px", marginTop: "-40px" }}
                    controls
                    width="100%"
                  >
                    <source
                      src={
                        API_VOCABULARIES +
                        "/" +
                        `playAudio/${word.audioSentence}`
                      }
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
                    Questions
                  </Link>
                </td>

                {/* <td>
                  <button  type="button" className="btn btn-danger">
                    delete
                  </button>
                </td> */}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminWordsComponent;
