import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_USER_COURSES } from "../../baseUrl";
import { Cookies } from "react-cookie";
import "../../../styles/user/ListCourse.css";
import { CourseItemComponent } from "./CourseItemComponent";

const UserListCourses = () => {
  const cookies = new Cookies();
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(API_USER_COURSES, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        setCourses(response.data);
      })
      .catch((errors) => {
        if (errors.response.status === 401 || errors.response.status === 403) {
          navigate("/auth/user/login");
        }
      });
  }, []);

  return (
    <div className="container">
      <div className="list-container">
        <h3>Danh sách các khóa học</h3>
        {courses.length > 0 &&
          courses.map((course) => (
            <Link
              style={{ textDecoration: "none" }}
              key={course.id}
              to={`/user/courses/${course.id}/topics`}
            >
              <CourseItemComponent course={course} />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default UserListCourses;
