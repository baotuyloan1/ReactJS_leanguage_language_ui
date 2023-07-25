import axios from "axios";
import { API_USER_COURSES } from "../../components/baseUrl";

const instance = axios.create({
  baseURL: API_USER_COURSES,
  withCredentials: true,
});

export const userGetCourses = () => instance.get("");
export const userGetTopicsByCourseId = (id) => instance.get(`/${id}/topics`);
