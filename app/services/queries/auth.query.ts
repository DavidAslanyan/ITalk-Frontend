import { useMutation, useQuery } from "@tanstack/react-query";
import { getUser, postUser, loginUser, updateUser, changeDifficulty, getUsersList, logoutUser } from "../controllers/auth.controller";
import { clearTokensFromSecureStorage } from "@/app/utilities/functions/crud-tokens-storage";


export const getUserQuery = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    staleTime: 5 * 60 * 1000,
    retry: 2, 
    refetchOnWindowFocus: false, 
  });
};

export const getUsersListQuery = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUsersList,
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


export const logoutUserMutation = () => {
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      clearTokensFromSecureStorage();
    }
  })
}


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
