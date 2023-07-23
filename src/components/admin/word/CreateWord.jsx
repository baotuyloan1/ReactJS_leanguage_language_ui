import {useEffect, useRef, useState} from "react";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import "./CreateWord.css";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import axios from "axios";
import {adminCreateTopic} from "../../../api/admin/AdminTopic";
import {adminCreateVocabulary} from "../../../api/admin/AdminVocabulary";


const CreateWordComponent = () => {
    const {id} = useParams();
    const initObject = {
        topic: {
            id: id,
        },
        word: "",
        ipa: "",
        meaningWord: "",
        type: "",
        sentence: "",
        meaningSentence: "",
        audioSentence: "",
        audioWord: "",
    };
    const [wordObj, setWordObj] = useState(initObject);

    console.log(wordObj);
    const handleChangeInput = (key, value) => {
        setWordObj((current) => ({...current, [key]: value}));
    };
    const [searchParams] = useSearchParams();
    const topicName = searchParams.get("topicName");

    const [audioWordSrc, setAudioWordSrc] = useState();
    const [audioSentenceSrc, setAudioSentenceSrc] = useState();
    const [imgPreview, setImgPreview] = useState();
    const [key, setKey] = useState(0);
    const [keySentence, setKeySentence] = useState(0);

    const [audioWordFile, setAudioWordMultiPartFile] = useState();
    const [audioSentenceMultipartFile, setAudioSentenceMultipartFile] = useState();
    const [imgMultipartFile, setImgMultipartFile] = useState();
    const inputImgRef = useRef(null);
    const inputWordRef = useRef(null);
    const inputSentenceRef = useRef(null);

    function clearForm() {
        setWordObj(initObject)
        setImgPreview(null);
        setAudioWordSrc(null);
        setAudioSentenceSrc(null);
        inputImgRef.current.value = null;
        inputWordRef.current.value = null;
        inputSentenceRef.current.value = null;

        setImgMultipartFile(null);
        setAudioSentenceMultipartFile(null);
        setAudioWordMultiPartFile(null);
    }

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
            const url = URL.createObjectURL(file);
            setAudioWordSrc(url);
            setAudioWordMultiPartFile(file);
            setKey((key) => key + 1);
        } else {
            setAudioWordSrc("");
        }
    };

    const handleInputAudioSentence = (audio) => {
        const file = audio.target.files[0];
        if (file !== null) {
            const url = URL.createObjectURL(file);
            setAudioSentenceSrc(url);
            setAudioSentenceMultipartFile(file);
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
            setImgMultipartFile(file);
        } else {
            setImgPreview("");
        }
    };

    const postData = (e) => {
        e.preventDefault();
        setError({});
        const bodyFormData = new FormData();
        const json = JSON.stringify(wordObj);
        const blod = new Blob([json], {
            type: "application/json",
        });
        bodyFormData.append("vocabulary", blod);
        bodyFormData.append("audioWord", audioWordFile);
        bodyFormData.append("audioSentence", audioSentenceMultipartFile);
        bodyFormData.append("img", imgMultipartFile);

        adminCreateVocabulary(bodyFormData).then((response) => {
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
                console.log(exception);
                if (exception.response.data.errors?.length > 0) exception.response.data.errors.forEach((element) => {
                    setError((errors) => ({
                        ...errors, [element["field"]]: element["defaultMessage"],
                    }));
                });
            });
    };

    return (<div className="container">
        <div className="card">
            <div className="card-body">
                <h2 className="card-title"> Add new word</h2>
                <form className="row g-3">
                    <div className="col-md-4">
                        <label htmlFor="inputEmail4" className="form-label">
                            Word
                        </label>
                        <input
                            value={wordObj.word}
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
                            value={wordObj.ipa}
                            type="text"
                            className="form-control"
                            onChange={(e) => handleChangeInput("ipa", e.target.value)}
                        />
                        {errors.ipa && <span>API {errors.ipa}</span>}
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="inputEmail4" className="form-label">
                            Type
                        </label>
                        <input
                            value={wordObj.type}
                            type="text"
                            className="form-control"
                            onChange={(e) => handleChangeInput("type", e.target.value)}
                        />
                        {errors.type && <span>Type {errors.type}</span>}
                    </div>
                    <div className="col-md-8">
                        <label htmlFor="inputCity" className="form-label">
                            Meaning word
                        </label>
                        <input
                            value={wordObj.meaningWord}
                            type="text"
                            className="form-control"
                            onChange={(e) => handleChangeInput("meaningWord", e.target.value)}
                        />
                        {errors.meaningWord && (<span>Meaning word {errors.meaningWord}</span>)}
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
                            ref={inputImgRef}
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
                            ref={inputWordRef}
                            type="file"
                            className="form-control"
                            onChange={handleInputAudioWord}
                        />
                        {errors.audioWord && <span>Audio {errors.audioWord}</span>}
                    </div>
                    <div className="col-md-6">
                        {audioWordSrc && (<video key={key} height="100px" width="100%" controls>
                            <source src={audioWordSrc} type="audio/mpeg"></source>
                        </video>)}
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="inputCity" className="form-label">
                            Audio Sentence
                        </label>
                        <input
                            ref={inputSentenceRef}
                            type="file"
                            className="form-control"
                            onChange={handleInputAudioSentence}
                        />
                        {errors.audioSentence && (<span>Audio {errors.audioSentence}</span>)}
                    </div>
                    <div className="col-md-6">
                        {audioSentenceSrc && (<video key={keySentence} height="100px" width="100%" controls>
                            <source src={audioSentenceSrc} type="audio/mpeg"></source>
                        </video>)}
                    </div>

                    <div className="col-12">
                        <label htmlFor="inputAddress" className="form-label">
                            Sentence
                        </label>
                        <input
                            value={wordObj.sentence}
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
                            value={wordObj.meaningSentence}
                            type="text"
                            className="form-control"
                            placeholder="Input meaning sentence"
                            onChange={(e) => handleChangeInput("meaningSentence", e.target.value)}
                        />
                        {errors.meaningSentence && (<span>Meaning word {errors.meaningSentence}</span>)}
                    </div>
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
    </div>);
};
export default CreateWordComponent;
