import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useHomePageLogic = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await fetch('http://62.113.118.59:1337/api/user-info');
        if (response.ok) {
          const data = await response.json();
          console.log(data);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
      }
    };

    getUserInfo();
  }, []);

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
