const BASE = "http://localhost:3000";
const VERSION  = "api/v1";
const PROGRESS = "progress"

export const API_URLS = {
  AUTH: `${BASE}/${VERSION}/auth`,
  REGISTER: `${BASE}/${VERSION}/auth/register`,
  LOGIN: `${BASE}/${VERSION}/auth/login`,
  AUTH_UPDATE: `${BASE}/${VERSION}/auth/update`,
  ADD_GAME: `${BASE}/${VERSION}/${PROGRESS}/game`,
  CLEAR_GAMES: `${BASE}/${VERSION}/${PROGRESS}/games/clear`,
  ADD_COINS: `${BASE}/${VERSION}/${PROGRESS}/add-coins`,
  SUBTRACT_COINS: `${BASE}/${VERSION}/${PROGRESS}/subtract-coins`,
  PURCHASE:  `${BASE}/${VERSION}/${PROGRESS}/purchase`,
};

