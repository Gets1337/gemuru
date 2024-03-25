import { useState } from 'react';
import { fetchSignIn } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

export const useSignInPageLogic = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    if (name === 'login') {
      setLogin(value);
    } else if (name === 'password') {
      setPassword(value);
    }

    const loginValue = name === 'login' ? value : login;
    const passwordValue = name === 'password' ? value : password;

    setIsFormValid(loginValue.trim() !== '' && passwordValue.trim() !== '');
  };

  const handleSubmit = async (e: any) => {
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
