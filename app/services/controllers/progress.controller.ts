import { API_URLS } from "@/app/utilities/constants/api-endpoints";
import axiosInstance from "@/app/utilities/functions/axios-instance";
import { AddCoinsType, AddGameType, AddPointsType, PurchaseStoreItemType, SubtractCoinsType, UpdateProgressType } from "@/app/utilities/types/progress.type";
import axios from "axios";


export const updateProgress = async (data: UpdateProgressType) => {
  try {
    console.log("Called api")
    const response = await axiosInstance.patch(`${API_URLS.UPDATE_PROGRESS}`, data);
    return response.data;
  } catch(error) {
    console.error("There was an error updating user progress:", error);
    throw error; 
  }
};

export const addPassedGame = async (data: AddGameType) => {
  try {
    const response = await axiosInstance.post(`${API_URLS.ADD_GAME}`, data);
    return response.data;
  } catch(error) {
    console.error("There was an error when adding passed game:", error);
    throw error; 
  }
};


export const clearPassedGames = async () => {
  try {
    const response = await axiosInstance.put(`${API_URLS.CLEAR_GAMES}`);
    return response.data;
  } catch(error) {
    console.error("There was an error when clearing passed games:", error);
    throw error; 
  }
}

export const addCoins = async (data: AddCoinsType) => {
  try {
    const response = await axiosInstance.patch(`${API_URLS.ADD_COINS}`, data);
    return response.data;
  } catch(error) {
    console.error("There was an error adding coins:", error);
    throw error; 
  }
}


export const subtractCoins = async (data: SubtractCoinsType) => {
  try {
    const response = await axiosInstance.patch(`${API_URLS.SUBTRACT_COINS}`, data);
    return response.data;
  } catch(error) {
    console.error("There was an error subtracting coins:", error);
    throw error; 
  }
}

export const addPoints = async (data: AddPointsType) => {
  try {
    const response = await axiosInstance.patch(`${API_URLS.ADD_POINTS}`, data);
    return response.data;
  } catch(error) {
    console.error("There was an error adding points:", error);
    throw error; 
  }
}

export const purchaseStoreItem = async (data: PurchaseStoreItemType) => {
  try {
    const response = await axiosInstance.post(`${API_URLS.PURCHASE}`, data);
    return response.data;
  } catch(error) {
    console.error("There was an error purchasing store item:", error);
    throw error; 
  }
}
