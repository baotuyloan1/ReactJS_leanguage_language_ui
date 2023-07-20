import axios from "axios";
import { API_AUTH_LOGIN } from "../../components/baseUrl";

const instance = axios.create({
    baseURL: API_AUTH_LOGIN,
    withCredentials: true,
  });
  
  export const adminGetCourses = () => {
    return instance.get("/");
  };
  
//   export const adminGetCourseById = (courseId) => {
//     return instance.get(`/courseId/${courseId}`);
//   };
  
  export const adminCreateCourse = (course) =>{
    return instance.post('',course);
  }
  