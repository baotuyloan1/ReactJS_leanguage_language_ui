import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import "./CreateWord.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import axios from "axios";
import { adminCreateTopic } from "../../../api/admin/AdminTopic";

const CreateWordComponent = () => {
  const { id } = useParams();
  const [wordObj, setWordObj] = useState({
    topic: {
      id: id,
    },
  });

  console.log(wordObj);
  const handleChangeInput = (key, value) => {
    setWordObj((current) => ({ ...current, [key]: value }));
  };
  const [searchParams, setSearchParams] = useSearchParams();
  const topicName = searchParams.get("topicName");

  const [audioWordSrc, setAudioWordSrc] = useState();
  const [audioSentenceSrc, setAudioSentenceSrc] = useState();
  const [imgPreview, setImgPreview] = useState();
  const [key, setKey] = useState(0);
  const [keySentence, setKeySentence] = useState(0);
  const [nameAudioWord, setNameAudioWord] = useState();
  const [nameAudioSentence, setNameAudioSentence] = useState();
  const [nameImg, setNameImg] = useState();

  const [audioWordFile, setAudioWordFile] = useState();
  const [audioSentenceFile, setAudioSentenceFile] = useState();
  const [imgFile, setImgFile] = useState();

  const [word, setWord] = useState("");
  const [sentence, setSentence] = useState("");
  const [meaningWord, setMeaningWord] = useState("");
  const [type, setType] = useState("");
  const [ipa, setIpa] = useState("");
  const [meaningSentence, setMeaningSentence] = useState("");

  const naviagte = useNavigate();

  function clearForm() {}

  useEffect(() => {
    return () => {
      audioWordSrc && URL.revokeObjectURL(audioWordSrc);
    };
  }, [audioWordSrc]);

  useEffect(() => {
    return () => {
      audioSentenceSrc && URL.revokeObjectURL(audioSentenceSrc);
    };
  }, [audioSentenceSrc]);

  useEffect(() => {
    return () => {
      imgPreview && URL.revokeObjectURL(imgPreview);
    };
  }, [imgPreview]);

  const [errors, setError] = useState({});
  const handleInputAudioWord = (audio) => {
    const file = audio.target.files[0];
    if (file !== null) {
      var url = URL.createObjectURL(file);
      setAudioWordSrc(url);
      setNameAudioWord(file.name);
      setAudioWordFile(file);
      setKey((key) => key + 1);
      console.log(audio);
    } else {
      setAudioWordSrc("");
    }
  };

  const handleInputAudioSentence = (audio) => {
    const file = audio.target.files[0];
    if (file !== null) {
      var url = URL.createObjectURL(file);
      setAudioSentenceSrc(url);
      setNameAudioSentence(file.name);
      setAudioSentenceFile(file);
      setKeySentence((key) => key + 1);
    } else {
      setAudioSentenceSrc("");
    }
  };

  const handleSelectImgPreview = (img) => {
    const file = img.target.files[0];
    if (file !== null) {
      var url = URL.createObjectURL(file);
      setImgPreview(url);
      setNameImg(file.name);
      setImgFile(file);
      console.log(url);
    } else {
      setImgPreview("");
    }
  };

  const postData = (e) => {
    e.preventDefault();
    setError({});
    const bodyFormData = new FormData();
    const vocabulary = {
      word: word,
      ipa: ipa,
      meaningWord: meaningWord,
      type: type,
      sentence: sentence,
      meaningSentence: meaningSentence,
      audioSentence: nameAudioSentence,
      audioWord: nameAudioWord,
      topic: {
        id: id,
      },
    };
    const json = JSON.stringify(wordObj);
    const blod = new Blob([json], {
      type: "application/json",
    });
    bodyFormData.append("vocabulary", blod);
    bodyFormData.append("audioWord", audioWordFile);
    bodyFormData.append("audioSentence", audioSentenceFile);
    bodyFormData.append("img", imgFile);

    adminCreateTopic();
    axios({
      method: "post",
      url: "http://localhost:8080/api/vocabularies",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        console.log(response);
        toast.success("🦄 Thêm từ vựng thành công!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        clearForm();
      })
      .catch((exception) => {
        /**
         * Validate in server
         */
        console.log(exception);
        if (exception.response.data.errors?.length > 0)
          exception.response.data.errors.forEach((element) => {
            setError((errors) => ({
              ...errors,
              [element["field"]]: element["defaultMessage"],
            }));
          });
      });
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title"> Add new word</h2>
          <form className="row g-3">
            <div className="col-md-4">
              <label htmlFor="inputEmail4" className="form-label">
                Word
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => handleChangeInput("word", e.target.value)}
              />
              {errors.word && <span>Name {errors.word}</span>}
            </div>
            <div className="col-md-4">
              <label htmlFor="inputPassword4" className="form-label">
                IPA
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => handleChangeInput("ipa", e.target.value)}
              />
              {errors.IPA && <span>API {errors.IPA}</span>}
            </div>
            <div className="col-md-4">
              <label htmlFor="inputEmail4" className="form-label">
                Type
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => handleChangeInput("type", e.target.value)}
              />
              {errors.type && <span>Type {errors.type}</span>}
            </div>
            <div className="col-md-8">
              <label htmlFor="inputCity" className="form-label">
                Meaning word meaningWord
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  handleChangeInput("meaningWord", e.target.value)
                }
              />
              {errors.meaningWord && (
                <span>Meaning word {errors.meaningWord}</span>
              )}
            </div>
            <div className="col-md-4">
              <label htmlFor="inputCity" className="form-label">
                Topic
              </label>
              <input
                disabled
                type="text"
                className="form-control"
                value={`${id} - ${topicName}`}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputCity" className="form-label">
                Image
              </label>
              <input
                type="file"
                className="form-control"
                onChange={handleSelectImgPreview}
              />
              {errors.img && <span>Image {errors.img}</span>}
            </div>
            <div className="col-md-6">
              {imgPreview && <img src={imgPreview} height="100px"></img>}
            </div>

            <div className="col-md-6">
              <label htmlFor="inputCity" className="form-label">
                Audio word
              </label>
              <input
                type="file"
                className="form-control"
                onChange={handleInputAudioWord}
              />
              {errors.audioWord && <span>Audio {errors.audioWord}</span>}
            </div>
            <div className="col-md-6">
              {audioWordSrc && (
                <video key={key} height="100px" width="100%" controls>
                  <source src={audioWordSrc} type="audio/mpeg"></source>
                </video>
              )}
            </div>

            <div className="col-md-6">
              <label htmlFor="inputCity" className="form-label">
                Audio Sentence
              </label>
              <input
                type="file"
                className="form-control"
                onChange={handleInputAudioSentence}
              />
              {errors.audioSentence && (
                <span>Audio {errors.audioSentence}</span>
              )}
            </div>
            <div className="col-md-6">
              {audioSentenceSrc && (
                <video key={keySentence} height="100px" width="100%" controls>
                  <source src={audioSentenceSrc} type="audio/mpeg"></source>
                </video>
              )}
            </div>

            <div className="col-12">
              <label htmlFor="inputAddress" className="form-label">
                Sentence
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Input sentence english"
                onChange={(e) => handleChangeInput("sentence", e.target.value)}
              />
              {errors.sentence && <span>Meaning word {errors.sentence}</span>}
            </div>
            <div className="col-12">
              <label htmlFor="inputAddress2" className="form-label">
                Meaning Sentence
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Input meaning sentence"
                onChange={(e) =>
                  handleChangeInput("meaningSentence", e.target.value)
                }
              />
              {errors.meaningSentence && (
                <span>Meaning word {errors.meaningSentence}</span>
              )}
            </div>

            {/* <div className="col-md-4">
              <label htmlFor="inputState" className="form-label">
                State
              </label>
              <select id="inputState" className="form-select">
                <option selected>Choose...</option>
                <option>...</option>
              </select>
            </div> */}

            <div className="col-12">
              <button
                type="button"
                className="btn btn-primary"
                onClick={postData}
              >
                Add Vocabulary
              </button>
            </div>
          </form>
        </div>
      </div>
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
    </div>
  );
};
export default CreateWordComponent;
