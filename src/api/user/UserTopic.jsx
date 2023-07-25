import axios from "axios";
import { API_USER_TOPICS } from "../../components/baseUrl";

const instance = axios.create({
  baseURL: API_USER_TOPICS,
  withCredentials: true,
});

export const userGetCourses = () => instance.get("");
export const userGetVocabulariesByTopicId = (id) =>
  instance.get(`/${id}/vocabularies`);
