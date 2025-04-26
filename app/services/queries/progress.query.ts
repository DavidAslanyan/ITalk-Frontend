import { useMutation } from "@tanstack/react-query";
import { addCoins, addPassedGame, addPoints, clearPassedGames, purchaseStoreItem, subtractCoins, updateProgress } from "../controllers/progress.controller";



export const updateProgressMutation = () => {
  return useMutation({
    mutationFn: updateProgress
  });
};

export const addPassedGameMutation = () => {
  return useMutation({
    mutationFn: addPassedGame,
    onError: (error) => {
      throw error
    }
  });
};

export const clearPassedGamesMutation = () => {
  return useMutation({
    mutationFn: clearPassedGames
  });
};

export const addCoinsMutation = () => {
  return useMutation({
    mutationFn: addCoins,onError: (error) => {
      throw error
    }
  });
};

export const subtractCoinsMutation = () => {
  return useMutation({
    mutationFn: subtractCoins
  });
};

export const addPointsMutation = () => {
  return useMutation({
    mutationFn: addPoints,
    onError: (error) => {
      throw error
    }
  });
};

export const purchaseStoreItemMutation = () => {
  return useMutation({
    mutationFn: purchaseStoreItem
  });
};

