const ROOT = "http://localhost:8080";
const API_BASE = ROOT + "/api/v1";
export const API_USER = API_BASE + "/user";

/**
 * REST API URL USER
 */
export const API_VOCABULARIES = API_BASE + "/vocabularies";
export const API_USER_LEARN = API_USER + "/learn";
export const API_USER_TOPIC = API_USER + "/topics";
export const API_USER_SAVE_LEARNED_WORD = API_USER + "/learn-new";
export const API_USER_COURSES = API_USER + "/courses";
export const API_USER_DEVICES = API_USER + "/devices";
export const API_USER_TOPICS = API_USER + "/topics";
export const API_QUESTIONS = API_BASE + "/questions";
export const API_USER_NEXT_REVIEW_VOCABULARIES = API_USER + "/next-word-review";

export const API_USER_UPDATE_VOCABULARIES = "/update-vocabulary";
/**
 * REST API URL ADMIN
 */
export const API_ADMIN_COURSES = API_BASE + "/courses";
export const API_ADMIN_TOPICS = API_BASE + "/topics";
export const API_ADMIN_VOCABULARIES = API_BASE + "/vocabularies";
export const API_ADMIN_QUESTION = API_BASE + "/questions";

/**
 * Resource URL
 */
const RESOURCE_IMG_URL = ROOT + "/resources/img";
export const RESOURCE_IMG_WORD_URL = RESOURCE_IMG_URL + "/wordImg";
export const RESOURCE_IMG_COURSE_URL = RESOURCE_IMG_URL + "/courseImg";

const API_AUDIO = API_BASE + "/audio";
export const API_AUDIO_PLAY = API_AUDIO + "/playAudio";

/**
 * Auth URL
 */
export const API_AUTH = API_BASE + "/auth";
