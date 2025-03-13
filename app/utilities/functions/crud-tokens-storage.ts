import secureLocalStorage from "react-secure-storage";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants/global-data";


export const saveTokensInSecureStorage = (accessToken: string, refreshToken: string) => {
  secureLocalStorage.setItem(ACCESS_TOKEN, accessToken);
  secureLocalStorage.setItem(REFRESH_TOKEN, refreshToken);
}


export const getAccessToken = () => {
  return secureLocalStorage.getItem(ACCESS_TOKEN);
}


export const getRefreshToken = () => {
  return secureLocalStorage.getItem(REFRESH_TOKEN);
}