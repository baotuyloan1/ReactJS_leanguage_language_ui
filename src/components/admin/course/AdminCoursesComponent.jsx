import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  adminDeleteCourseById,
  adminGetCourses,
} from "../../../api/admin/AdminCourse";
import "../../../styles/admin/ListWord.css";
import { RESOURCE_IMG_COURSE_URL } from "../../baseUrl";

const AdminCoursesComponent = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  useEffect(() => {
      console.log(1)
    adminGetCourses()
      .then((response) => setCourses(response.data))
      .catch((error) => {
        if (error.response.status === 401) {
          navigate("/auth/admin/login");
        }
        console.log((error))
      });
  }, []);
  const handleDeleteCourses = (id) => {
    if (window.confirm("Xóa sẽ không thể hoàn tất, có xác nhận xóa ?")) {
      adminDeleteCourseById(id)
        .then(() => {
          setCourses((courses) => {
            return courses.filter((question) => question.id !== id);
          });
        })
        .catch((err) => {
          if (err.response.status === 409) {
            alert("Course này còn chứa nhiều topic khác không thể xóa");
            console.log(err.response);
          }
        });
    } else {
    }
  };
  return (
    <div className="container-fluid">
      <h2 className="text-center">Course List</h2>
      <Link
        to="/admin/courses/create"
        type="button"
        className="btn btn-success"
      >
        Add new category
      </Link>
      <br />
      <br />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Img</th>
            <th>Title</th>
            <th>Target</th>
            <th>Description</th>
            <th>Action Topic</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses &&
            courses.length > 0 &&
            courses.map((course) => (
              <tr key={course.id}>
                <td>{course.id}</td>
                <td>
                  <img
                    alt="Ảnh đại diện khóa học"
                    src={`${RESOURCE_IMG_COURSE_URL}/${course.img}`}
                  ></img>
                </td>
                <td>{course.title}</td>
                <td>{course.target}</td>
                <td>{course.description}</td>
                <td>
                  <Link
                    className="btn btn-primary me-2"
                    to={`/admin/courses/${course.id}/addTopic?courseName=${course.title}`}
                  >
                    Add topic
                  </Link>
                  <Link
                    className="btn btn-info me-2"
                    to={`/admin/topics?courseId=${course.id}&courseName=${course.title}`}
                  >
                    List topic
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={(e) => handleDeleteCourses(course.id)}
                  >
                    Delete course
                  </button>
                  {/*<button className="btn btn-primary">Edit course</button>*/}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCoursesComponent;
