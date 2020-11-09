const BASE_URL = `http://localhost:8080`;

// User authentication API
export const USER_REGISTRATION_API = `${BASE_URL}/auth/register`;
export const ACTIVATE_USER_ACCOUNT_API = `${BASE_URL}/auth/activate`;
export const USER_LOGIN_API = `${BASE_URL}/auth/login`;
export const USER_FORGOT_PASSWORD_API = `${BASE_URL}/auth/forgot-password`;
export const USER_RESET_PASSWORD_API = `${BASE_URL}/auth/reset-password`;

// User operations API
export const GET_ALL_POLLS_API = `${BASE_URL}/user/polls/userID`;
export const CREATE_POLL_API = `${BASE_URL}/user/poll/create`;
export const DELETE_POLL_API = `${BASE_URL}/user/poll`;
export const GET_POLL_BY_ID_API = `${BASE_URL}/user/poll/pollID`;