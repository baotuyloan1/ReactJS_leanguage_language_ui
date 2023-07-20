import axios from "axios";
import { API_ADMIN_COURSES, API_VOCABULARIES } from "../../baseUrl";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState({});
  const [imgObjectURL, setImgObjectURL] = useState();
  const [errors, setErrors] = useState({});
  const handleChangeInput = (key, value) => {
    setCategory({ ...category, [key]: value });
  };
  const [img, setImg] = useState();

  const handleChangeImg = (img) => {
    if (img != null) {
      const url = URL.createObjectURL(img);
      setImgObjectURL(url);
      setImg(img);
    }
  };

  useEffect(() => {
    return () => {
      imgObjectURL && URL.revokeObjectURL(imgObjectURL);
    };
  }, [imgObjectURL]);

  const handleValidation = () => {
    var formIsValid = true;
    var errors = {};
    /**
     * Form validate on frontend
     */
    if (!category["title"]) {
      formIsValid = false;
      errors["title"] = "Cannot be blank";
    }

    if (!category["target"]) {
      formIsValid = false;
      errors["target"] = "Cannot be blank";
    }

    if (!category["description"]) {
      formIsValid = false;
      errors["description"] = "Cannot be blank";
    }

    if (!img) {
      formIsValid = false;
      errors["img"] = "Chọn ảnh đại diện khóa học";
    }
    setErrors({ ...errors });
    return formIsValid;
  };

  const handleSubmit = () => {
    console.log(handleValidation());

    if (handleValidation()) {
      const json = JSON.stringify(category);
      const bodyFormData = new FormData();
      const blod = new Blob([json], {
        type: "application/json",
      });

      console.log(json);

      bodyFormData.append("course", blod);
      bodyFormData.append("img", img);
      axios({
        method: "post",
        url: API_ADMIN_COURSES,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((response) => {
          if (response.status === 201) {
            navigate("/admin/categories");
          }else{
            console.log("something error")
          }
        })
        .catch((exception) => {
          console.log(exception);
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
                Tên khóa học
              </label>
              <input
                onChange={(e) => handleChangeInput("title", e.target.value)}
                type="text"
                className="form-control"
              />
              <span style={{ color: "red" }}>{errors["title"]}</span>
            </div>
            <div className="col-12">
              <label htmlFor="inputEmail4" className="form-label">
                Target
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => handleChangeInput("target", e.target.value)}
              />
              <span style={{ color: "red" }}>{errors["target"]}</span>
            </div>

            <div className="col-md-6">
              <label htmlFor="inputCity" className="form-label">
                Image
              </label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => handleChangeImg(e.target.files[0])}
              />
              <span style={{ color: "red" }}>{errors["img"]}</span>
            </div>

            <div className="col-md-6">
              {imgObjectURL && <img src={imgObjectURL} height="100px" />}
            </div>
            <div className="col-md-12">
              <label htmlFor="inputCity" className="form-label">
                Description
              </label>
              <textarea
                rows="5"
                type="text"
                className="form-control"
                onChange={(e) =>
                  handleChangeInput("description", e.target.value)
                }
              />
              <span style={{ color: "red" }}>{errors["description"]}</span>
            </div>

            <div className="col-12">
              <button
                type="button"
                className="btn btn-primary"
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

export default CreateCourse;
