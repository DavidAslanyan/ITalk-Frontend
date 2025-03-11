import { useMutation, useQuery } from "@tanstack/react-query";
import { getUser, postUser, loginUser, updateUser, changeDifficulty } from "../controllers/auth.controller";


export const getUserQuery = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    staleTime: 5 * 60 * 1000,
    retry: 2, 
    refetchOnWindowFocus: false, 
  });
};

export const registerUserMutation = () => {
  return useMutation({
    mutationFn: postUser
  });
};

export const loginUserMutation = () => {
  return useMutation({
    mutationFn: loginUser
  });
};


export const updateUserMutation = () => {
  return useMutation({
    mutationFn: updateUser
  })
}


export const changeDifficultyrMutation = () => {
  return useMutation({
    mutationFn: changeDifficulty
  })
}
