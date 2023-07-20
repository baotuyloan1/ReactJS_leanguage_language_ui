import axios from "axios";
import { API_ADMIN_COURSES } from "../../components/baseUrl";

const instance = axios.create({
  baseURL: API_ADMIN_COURSES,
  withCredentials: true,
});

export const adminGetCourses = () => {
  return instance.get("/");
};

//   export const adminGetCourseById = (courseId) => {
//     return instance.get(`/courseId/${courseId}`);
//   };

export const adminCreateCourse = (course) => {
  return instance.post("", course);
};

export const adminDeleteCourseById = (courseId) =>{
  return instance.delete(`/${courseId}`);
}