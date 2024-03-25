import { useState, useEffect } from 'react';
import { fetchUserInfo } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

export const useHome = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const data = await fetchUserInfo();
        console.log(data);
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
      }
    };

    getUserInfo();
  }, [navigate]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return {
    open,
    toggleDrawer,
  };
};
