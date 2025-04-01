"use client";
import { useState, useEffect } from "react";
import { getUserQuery } from "@/app/services/queries/auth.query";
import { getUserFromLocalStorage, storeUserInLocalStorage } from "../functions/manage-user-local-storage";

const useGetUser = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: apiData, isLoading: apiLoading, isError, refetch } = getUserQuery();

  useEffect(() => {
    const localStorageData = getUserFromLocalStorage();
    if (localStorageData) {
      setUser(localStorageData); 
      setIsLoading(false); 
    } else {
      refetch();
    }
  }, []);
  
  useEffect(() => {
    if (apiData) {
      setUser(apiData.data);  
      storeUserInLocalStorage(apiData.data);  
      setIsLoading(false);  
    }
  }, [apiData]);

  if (isError) {
    console.log("Error fetching user data");
    setIsLoading(false); 
  }

  return { user, isLoading: isLoading || apiLoading };
};

export default useGetUser;
