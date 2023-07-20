import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { API_ADMIN_TOPICS } from "../../baseUrl";

const CreateTopicComponent = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const topicName = searchParams.get("topicName");

  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [img, setImg] = useState();
  const [topic, setTopic] = useState({});

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(img?.url);
    };
  }, [img]);
  const handleChangeImg = (img) => {
    if (img != null) {
      const url = URL.createObjectURL(img);
      setImg({ url: url, file: img });
    }
  };

  const handleValidation = () => {
    const errors = [];
    var isValid = true;
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

  const handleChangeInput = (key, value) => {
    setTopic({ ...topic, [key]: value });
  };
  const handleSubmit = () => {
    if (handleValidation()) {
      topic["course"] = { id: parseInt(id) };

      const json = JSON.stringify(topic);

      console.log(json)
      const blob = new Blob([json], {
        type: "application/json",
      });
      const bodyFormData = new FormData();
      bodyFormData.append("topic", blob);
      bodyFormData.append("img", img.file);

      axios({
        method: "post",
        url: API_ADMIN_TOPICS,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((response) => {
        console.log(response);
        navigate("/admin/courses");
      }).catch((errors)=>{
        console.log(errors)
      });
    }
  };
  return (
    <div className="">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title"> Add new target</h2>
          <form className="row g-3">
            <div className="col-12">
              <label htmlFor="inputEmail4" className="form-label">
                Tên topic tiếng anh
              </label>
              <input
                onChange={(e) => handleChangeInput("titleEn", e.target.value)}
                type="text"
                className="form-control"
              />
              <span style={{ color: "red" }}>{errors["titleEn"]}</span>
            </div>
            <div className="col-12">
              <label htmlFor="inputEmail4" className="form-label">
                Tên topic tiếng việt
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => handleChangeInput("titleVn", e.target.value)}
              />
              <span style={{ color: "red" }}>{errors["titleVn"]}</span>
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
                type="file"
                className="form-control"
                onChange={(e) => handleChangeImg(e.target.files[0])}
              />
              <span style={{ color: "red" }}>{errors["img"]}</span>
            </div>

            <div className="col-md-6"></div>
            <div className="col-md-6">
              {img && <img src={img.url} height="100px" />}
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
