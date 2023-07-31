import axios from "axios";
import { API_USER } from "../../components/baseUrl";

const instance = axios.create({
  baseURL: API_USER,
  withCredentials: true,
});
export const userPutSelectVocabulary = (data) =>
  instance.put("/review-selection", data);

export const userGetNextWordToReviews = () => instance.get("/next-word-review");
export const userPutReviewVocabulary = (data) =>
  instance.put("/review-word", data);
