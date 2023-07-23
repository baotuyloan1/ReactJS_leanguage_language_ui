import axios from "axios";
import {useEffect, useRef, useState} from "react";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {API_ADMIN_TOPICS} from "../../baseUrl";
import {adminCreateTopic} from "../../../api/admin/AdminTopic";
import {toast, ToastContainer} from "react-toastify";

const CreateTopicComponent = () => {
    const {id} = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const topicName = searchParams.get("courseName");
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const [img, setImg] = useState();
    const [topic, setTopic] = useState({});
    const inputRef = useRef(null);
    useEffect(() => {
        return () => {
            URL.revokeObjectURL(img?.url);
        };
    }, [img]);
    const handleChangeImg = (img) => {
        if (img != null) {
            const url = URL.createObjectURL(img);
            setImg({url: url, file: img});
        } else {
            setImg(null);
        }
    };

    const isValid = () => {
        const errors = [];
        let isValid = true;
        if (!topic["titleEn"]) {
            errors["titleEn"] = "Tên topic tiếng anh không được null";
            isValid = false;
        }
        if (!topic["titleVn"]) {
            errors["titleVn"] = "Tên topic tiếng việt không được null";
            isValid = false;
        }
        if (!img && !img?.file) {
            errors["img"] = "Vui lòng chọn ảnh đại diện cho topic";
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };
    const clearForm = () => {
        setTopic({titleEn: '', titleVn: ''});
        setErrors([]);
        setImg(null);
        inputRef.current.value = null;
    }

    const handleChangeInput = (key, value) => {
        setTopic({...topic, [key]: value});
    };
    const handleSubmit = () => {
        if (isValid()) {
            topic["course"] = {id: parseInt(id)};
            const json = JSON.stringify(topic);
            console.log(json);
            const blob = new Blob([json], {
                type: "application/json",
            });
            const bodyFormData = new FormData();
            bodyFormData.append("topic", blob);
            bodyFormData.append("img", img.file);
            adminCreateTopic(bodyFormData).then((response) => {
                console.log(response);
                toast.success("🦄 Thêm topic thành công!", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                clearForm();
            })
                .catch((errors) => {
                    console.log(errors);
                });
        }
    };
    return (
        <div className="">
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
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title"> Add new target</h2>
                    <form className="row g-3">
                        <div className="col-12">
                            <label htmlFor="inputEmail4" className="form-label">
                                Tên topic tiếng anh
                            </label>
                            <input
                                value={topic.titleEn}
                                onChange={(e) => handleChangeInput("titleEn", e.target.value)}
                                type="text"
                                className="form-control"
                            />
                            <span style={{color: "red"}}>{errors["titleEn"]}</span>
                        </div>
                        <div className="col-12">
                            <label htmlFor="inputEmail4" className="form-label">
                                Tên topic tiếng việt
                            </label>
                            <input
                                value={topic.titleVn}
                                type="text"
                                className="form-control"
                                onChange={(e) => handleChangeInput("titleVn", e.target.value)}
                            />
                            <span style={{color: "red"}}>{errors["titleVn"]}</span>
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="inputCity" className="form-label">
                                Course
                            </label>
                            <input
                                className="form-control"
                                list="dataListOptions"
                                id="courseDataList"
                                value={`${id} - ${topicName}`}
                                disabled
                            ></input>
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="inputCity" className="form-label">
                                Ảnh topic
                            </label>
                            <input
                                ref={inputRef}
                                type="file"
                                className="form-control"
                                onChange={(e) => handleChangeImg(e.target.files[0])}
                            />
                            <span style={{color: "red"}}>{errors["img"]}</span>
                        </div>

                        <div className="col-md-6"></div>
                        <div className="col-md-6">
                            {img && <img src={img.url} height="100px"/>}
                        </div>

                        <div className="col-12">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleSubmit}
                            >
                                Add topic
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateTopicComponent;
