import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Cookies } from "react-cookie";
import "../../../styles/user/ListCourse.css";
import { UserTopicItem } from "./UserTopicItem";
import { userGetTopicsByCourseId } from "../../../api/user/UserCourse";

const UserListTopics = ({}) => {
  const cookies = new Cookies();
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    //   axios
    //       .get(API_USER_COURSES, {
    //         withCredentials: true,
    //       })
    //       .then((response) => {
    //         console.log(response);
    //         setCourses(response.data);
    //       })
    //       .catch((errors) => {
    //         if (errors.response.status === 401) {
    //           navigate("/auth/login");
    //         }
    //       });
    // }, []);

    userGetTopicsByCourseId(id)
      .then((response) => {
        setTopics(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <div className="list-container">
        <h3>Danh sách các chủ đề</h3>
        {topics.length > 0 &&
          topics.map((topic) => (
            <Link
              style={{ textDecoration: "none" }}
              key={topic.id}
              to={`/user/topics/${topic.id}/vocabularies`}
            >
              <UserTopicItem topic={topic} />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default UserListTopics;
