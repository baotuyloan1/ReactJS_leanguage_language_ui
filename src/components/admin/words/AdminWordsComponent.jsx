import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import { RESOURCE_IMG_WORD_URL, API_VOCABULARIES } from "../../baseUrl";
import "../../../styles/admin/ListWord.css";

const AdminWordsComponent = () => {
  const [words, setWords] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // const handleDeleteWord  = () =>{
  //   axios.
  // }
  useEffect(() => {
    axios
      .get(API_VOCABULARIES, {
        withCredentials: true,
      })
      .then((response) => {
        response.data.forEach((element) => {
          var formatDate = new Date(element.addedDate);
          formatDate = new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }).format(formatDate);
          element.addedDate = formatDate;
        });
        if (searchParams.get("topicId")) {
          response.data = response.data.filter(
            (word) => word.topic?.id == searchParams.get("topicId")
          );
          console.log(response.data);
        }
        setWords(response.data);
      });
  }, []);
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
            <th>Topic</th>
            <th>Course</th>
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
                <td>{word.topic?.name}</td>
                <td>{word.topic?.titleEn}</td>
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
