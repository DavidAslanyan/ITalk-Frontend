const BASE = "http://localhost:3000";
const VERSION  = "api/v1";
const PROGRESS = "progress"

export const API_URLS = {
  AUTH: `${BASE}/${VERSION}/auth`,
  LIST:  `${BASE}/${VERSION}/auth/list`,
  REGISTER: `${BASE}/${VERSION}/auth/register`,
  LOGIN: `${BASE}/${VERSION}/auth/login`,
  AUTH_UPDATE: `${BASE}/${VERSION}/auth/update`,
  ADD_GAME: `${BASE}/${VERSION}/${PROGRESS}/game`,
  CLEAR_GAMES: `${BASE}/${VERSION}/${PROGRESS}/games/clear`,
  ADD_COINS: `${BASE}/${VERSION}/${PROGRESS}/add-coins`,
  SUBTRACT_COINS: `${BASE}/${VERSION}/${PROGRESS}/subtract-coins`,
  ADD_POINTS: `${BASE}/${VERSION}/${PROGRESS}/add-points`,
  PURCHASE:  `${BASE}/${VERSION}/${PROGRESS}/purchase`,
  CHANGE_DIFFICULTY: `${BASE}/${VERSION}/auth/change-difficulty`,
  UPDATE_PROGRESS:  `${BASE}/${VERSION}/${PROGRESS}/add`
};

