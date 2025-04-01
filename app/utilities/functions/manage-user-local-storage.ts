import { UserState } from "@/lib/features/user/userSlice";


export const storeUserInLocalStorage = (user: UserState) => {
  try {
    localStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
  }
};


export const getUserFromLocalStorage = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    return null;
  }
};
