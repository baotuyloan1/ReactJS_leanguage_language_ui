const API_BASE = "http://localhost:8080/api";
const API_USER = API_BASE + "/user";
const API_ADMIN = API_BASE + "/admin";

/**
 * SRC AUDIO
 */
export const AUDIO_SRC = "http://localhost:8080/api";

/**
 * REST API URL USER
 */
export const API_VOCABULARIES = API_ADMIN + "/vocabularies";
export const API_USER_LEARN = API_USER + "/learn";
export const API_USER_SAVE_LEARNED_WORD = API_USER + "/saveNewWord";
export const API_USER_COURSES = API_USER + "/courses";
export const API_USER_TOPICS = API_USER + "/getTopicsByCourseId";
export const API_QUESTIONS = API_BASE + "/questions";
export const API_USER_NEXT_REVIEW_VOCABULARIES =
  API_USER + "/getNextWordToReview";

/**
 * REST API URL ADMIN
 */
export const API_ADMIN_COURSES = API_ADMIN + "/courses";
export const API_ADMIN_TOPICS = API_ADMIN + "/topics";
export const API_ADMIN_VOCABULARIES = API_ADMIN + "/vocabularies";

/**
 * Resource URL
 */
const RESOURCE_IMG_URL = "http://localhost:8080/resources/img";
export const RESOURCE_IMG_WORD_URL = RESOURCE_IMG_URL + "/wordImg";
export const RESOURCE_IMG_COURSE_URL = RESOURCE_IMG_URL + "/courseImg";

const API_AUDIO = "http://localhost:8080/audio";
export const API_AUDIO_PLAY = "http://localhost:8080/audio" + "/playAudio";

/**
 * Auth URL
 */
export const API_AUTH = API_BASE + "/auth";
