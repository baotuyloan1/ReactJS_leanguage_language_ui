import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_USER_COURSES } from "../baseUrl";
import { error } from "jquery";
import { Cookies } from "react-cookie";

const UserListCourses = () => {
  const cookies = new Cookies();
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(API_USER_COURSES, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        setCategories(response.data);
      })
      .catch((errors) => {
        if (errors.response.status === 401) {
          navigate("/auth/login")
        }
      });
  }, []);

  return (
    <div className="container pt-5">
      <div className="list-group">
        {categories.length > 0 &&
          categories.map((category) => (
            <Link
              to={"/user/topics/" + category.id}
              className="list-group-item list-group-item-action list-group-item-success"
            >
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{category.title}</h5>
                <small>3 days ago</small>
              </div>
              <p className="mb-1">{category.target}</p>
              <small>{category.description}</small>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default UserListCourses;
