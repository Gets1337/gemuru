import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserInfo } from '../../utils/api';

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

  const handleLogout = () => {
    navigate('/login');
  };

  return {
    open,
    toggleDrawer,
    handleLogout,
  };
};
