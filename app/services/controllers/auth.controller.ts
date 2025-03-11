import { API_URLS } from "@/app/utilities/constants/api-endpoints";
import { DifficultyLevel } from "@/app/utilities/enums/difficulty-level.enum";
import { LoginUserFormType, RegisterUserFormType, UpdateUserFormType } from "@/app/utilities/types/auth.type";
import axios from "axios";

const id  = "1ffbaed4-2661-4b9c-ae36-b31f121d4824";


export const getUser = async () => {
  try {
    const response = await axios.get(`${API_URLS.AUTH}/${id}`);
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
    return response.data;
  } catch(error) {
    console.error("Failed to login the user:", error);
    throw error; 
  }
}


export const updateUser = async ({ userId, data }: { userId: string; data: UpdateUserFormType }) => {
  try {
    const response = await axios.patch(`${API_URLS.AUTH_UPDATE}/${userId}`, data);
    return response.data;
  } catch(error) {
    console.error("Failed to update the user:", error);
    throw error; 
  }
}


export const changeDifficulty = async ({ level }: { level: DifficultyLevel | string }) => {
  try {
    const response = await axios.patch(`${API_URLS.CHANGE_DIFFICULTY}`, { level });
    return response.data;
  } catch(error) {
    console.error("Failed to udpate difficulty:", error);
    throw error; 
  }
}

