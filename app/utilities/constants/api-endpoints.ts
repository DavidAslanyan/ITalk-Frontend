export const BASE = "http://localhost:3000";
export const VERSION  = "api/v1";
export const PROGRESS = "progress"

export const API_URLS = {
  AUTH: `${BASE}/${VERSION}/user`,
  LIST:  `${BASE}/${VERSION}/user/list`,
  REGISTER: `${BASE}/${VERSION}/auth/register`,
  LOGIN: `${BASE}/${VERSION}/auth/login`,
  DELETE: `${BASE}/${VERSION}/user/`,
  GOOGLE_LOGIN: `${BASE}/${VERSION}/auth/google`,
  LOGOUT: `${BASE}/${VERSION}/auth/logout`,
  USER_UPDATE: `${BASE}/${VERSION}/user/update`,
  ADD_GAME: `${BASE}/${VERSION}/${PROGRESS}/game`,
  CLEAR_GAMES: `${BASE}/${VERSION}/${PROGRESS}/games/clear`,
  ADD_COINS: `${BASE}/${VERSION}/${PROGRESS}/add-coins`,
  SUBTRACT_COINS: `${BASE}/${VERSION}/${PROGRESS}/subtract-coins`,
  ADD_POINTS: `${BASE}/${VERSION}/${PROGRESS}/add-points`,
  PURCHASE:  `${BASE}/${VERSION}/${PROGRESS}/purchase`,
  CHANGE_DIFFICULTY: `${BASE}/${VERSION}/user/change-difficulty`,
  UPDATE_PROGRESS:  `${BASE}/${VERSION}/${PROGRESS}/add`
};

