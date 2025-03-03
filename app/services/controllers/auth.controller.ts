import { API_URLS } from "@/app/utilities/constants/api-endpoints";
import { LoginUserFormType, RegisterUserFormType } from "@/app/utilities/types/auth.type";
import axios from "axios";


export const getUser = async () => {
  try {
    const response = await axios.get(`${API_URLS.AUTH}/fcae8e76-1a1d-4fba-ae7a-df9ab09b3d8b`);
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

