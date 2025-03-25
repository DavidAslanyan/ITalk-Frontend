import { API_URLS } from "@/app/utilities/constants/api-endpoints";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/app/utilities/constants/global-data";
import { DifficultyLevel } from "@/app/utilities/enums/difficulty-level.enum";
import axiosInstance from "@/app/utilities/functions/axios-instance";
import { clearTokensFromSecureStorage, saveTokensInSecureStorage } from "@/app/utilities/functions/crud-tokens-storage";
import { LoginUserFormType, RegisterUserFormType, UpdateUserFormType } from "@/app/utilities/types/auth.type";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";

const id  = "e1630445-3f60-4b4c-b7a3-37ef7aba3bbb";


export const getUser = async () => {
  try {
    const response = await axiosInstance.get(`${API_URLS.AUTH}`);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the data:", error);
    throw error; 
  }
}


export const getUsersList = async () => {
   try {
    const response = await axiosInstance.get(`${API_URLS.LIST}`);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the data:", error);
    throw error; 
  }
}


export const postUser = async (data: RegisterUserFormType) => {
  try {
    const response = await axios.post(`${API_URLS.REGISTER}`, data);
    return response.data;
  } catch(error) {
    console.error("Failed to register the user:", error);
    throw error; 
  }
}


export const loginUser = async (data: LoginUserFormType) => {
  try {
    const response = await axios.post(`${API_URLS.LOGIN}`, data);
    if (response.data.data.tokens) {
      saveTokensInSecureStorage(
        response.data.data.tokens.accessToken,
        response.data.data.tokens.refreshToken
      );
    }
    return response.data;
  } catch(error) {
    console.error("Failed to login the user:", error);
    throw error; 
  }
}

export const logoutUser = async () => {
  try {
    await axiosInstance.post(`${API_URLS.LOGOUT}`);
  } catch(error) {
    console.error("Failed to logout the user:", error);
    throw error; 
  }
}


export const updateUser = async ({ data }: { data: UpdateUserFormType }) => {
  try {
    const response = await axiosInstance.patch(`${API_URLS.USER_UPDATE}`, data);
    return response.data;
  } catch(error) {
    console.error("Failed to update the user:", error);
    throw error; 
  }
}


export const changeDifficulty = async ({ level }: { level: DifficultyLevel | string }) => {
  try {
    const response = await axiosInstance.patch(`${API_URLS.CHANGE_DIFFICULTY}`, { level });
    return response.data;
  } catch(error) {
    console.error("Failed to udpate difficulty:", error);
    throw error; 
  }
}

export const googleLogin = async ({ id }: { id: string }) => {
  try {
    const response = await axiosInstance.post(`${API_URLS.GOOGLE_LOGIN}`, { id });
    return response.data;
  } catch(error) {
    console.error("Failed to sign in via Google:", error);
    throw error; 
  }
} 


// export const googleLogin = useGoogleLogin({
//   onSuccess: async ({ code }) => {
//     const tokens = await axios.post(API_URLS.GOOGLE_LOGIN, {
//       code,
//     });

//     console.log(tokens);
//   },
//   flow: 'auth-code',
// });