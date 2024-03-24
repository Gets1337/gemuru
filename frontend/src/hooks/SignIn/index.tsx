import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useSignInPageLogic = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    return login.trim() !== '' || password.trim() !== '';
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://62.113.118.59:1337/api/user.login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      });
      if (response.ok) {
        navigate('/');
      } else {
        console.error('Ошибка аутентификации');
      }
    } catch (error) {
      console.error('Ошибка сети', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    if (name === 'login') {
      setLogin(value);
    } else if (name === 'password') {
      setPassword(value);
    }
    setIsFormValid(validateForm());

    if (name === 'login' && value.trim() === '') {
      setIsFormValid(false);
    } else if (name === 'password' && value.trim() === '') {
      setIsFormValid(false);
    }
  };

  return {
    login,
    password,
    isLoading,
    isFormValid,
    handleInputChange,
    handleSubmit,
  };
};
