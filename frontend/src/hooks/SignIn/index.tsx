import { useState } from 'react';
import { fetchSignIn } from '../../utils/api';

export const useSignInPageLogic = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    return login.trim() !== '' || password.trim() !== '';
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

  const handleSubmit = async (e: any, navigate: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await fetchSignIn(login, password);
      navigate('/');
    } catch (error) {
      console.error('Ошибка аутентификации:', error);
    } finally {
      setIsLoading(false);
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
