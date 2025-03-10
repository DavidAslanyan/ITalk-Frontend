import { useMutation } from "@tanstack/react-query";
import { addPassedGame, clearPassedGames, subtractCoins } from "../controllers/progress.controller";


export const addPassedGameMutation = () => {
  return useMutation({
    mutationFn: addPassedGame
  });
};

export const clearPassedGamesMutation = () => {
  return useMutation({
    mutationFn: clearPassedGames
  });
};

export const subtractCoinsMutation = () => {
  return useMutation({
    mutationFn: subtractCoins
  });
};

