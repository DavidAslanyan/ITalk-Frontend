import { useQuery } from "@tanstack/react-query";
import { getUser } from "../controllers/auth.controller";


export const getUserQuery = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUser
  });
};

