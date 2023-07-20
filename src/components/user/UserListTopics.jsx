import axios from "axios";
import { useEffect, useState } from "react";
import {  API_USER_TOPICS } from "../baseUrl";
import { Link, useNavigate, useParams } from "react-router-dom";

const UserListTopics = () => {
  const { id } = useParams();
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${API_USER_TOPICS}/${id}`,{
        withCredentials: true
      })
      .then((response) => {
        setTopics(response.data);
      })
      .catch((errors) => {
        navigate("/auth/login")
      });
  }, []);
  return (
    <div className="container pt-5">
      <div className="list-group">
        {topics.length > 0 &&
          topics.map((topic) => (
            <Link key={topic.id}
              to={"/user/" + topic.id+"/learn"}
              className="list-group-item list-group-item-action list-group-item-success"
            >
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{topic.titleEn}</h5>
                <small>3 days ago</small>
              </div>
              <p className="mb-1">{topic.titleVn}</p>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default UserListTopics;
