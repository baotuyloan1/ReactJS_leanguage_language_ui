import axios from "axios";
import { API_ADMIN_VOCABULARIES } from "../../components/baseUrl";

const instance = axios.create({
  baseURL: API_ADMIN_VOCABULARIES,
  withCredentials: true,
});

export const adminCreateVocabulary = (vocabulary) => {
  return instance.post("", vocabulary, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const adminGetVocabularies = () => instance.get("");

export const adminGetVocabulariesByTopicId = () => instance.get("");
