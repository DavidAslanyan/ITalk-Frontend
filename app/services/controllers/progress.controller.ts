import { API_URLS } from "@/app/utilities/constants/api-endpoints";
import { AddGameType } from "@/app/utilities/types/progress.type";
import axios from "axios";


export const addPassedGame = async (data: AddGameType) => {
  try {
    const response = await axios.post(`${API_URLS.ADD_GAME}`, data);
    return response.data;
  } catch(error) {
    console.error("There was an error when adding passed game:", error);
    throw error; 
  }
};


export const clearPassedGames = async () => {
  try {
    const response = await axios.put(`${API_URLS.CLEAR_GAMES}`);
    return response.data;
  } catch(error) {
    console.error("There was an error when clearing passed games:", error);
    throw error; 
  }
}
