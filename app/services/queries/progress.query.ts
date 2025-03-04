import { useMutation } from "@tanstack/react-query";
import { addPassedGame, clearPassedGames } from "../controllers/progress.controller";


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