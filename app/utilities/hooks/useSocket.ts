import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { setUser } from '@/lib/features/user/userSlice';
import axiosInstance from '../functions/axios-instance';
import { API_URLS, BASE } from '../constants/api-endpoints';
import { storeUserInLocalStorage } from '../functions/manage-user-local-storage';


let socket: Socket;

const useSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket = io(BASE); 

    socket.on('update-user', () => {
      console.log('User data updated');
      getUser();
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  const getUser = async () => {
    try {
      const response = await axiosInstance.get(`${API_URLS.AUTH}`);
      console.log('Socket worked: ', response)
      dispatch(setUser(response.data.data)); 
      storeUserInLocalStorage(response.data.user);
    } catch (error) {
      console.error('Failed to fetch user data', error);
    }
  };

  return {};
};

export default useSocket;
