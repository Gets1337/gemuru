import { useState, useMemo } from 'react';
import { fetchSignIn } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

export const useSignIn = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validationData = useMemo(() => {
    const isFormValid = login.trim() !== '' && password.trim() !== '';
    return { isFormValid };
  }, [login, password]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    if (name === 'login') {
      setLogin(value);
    } else if (name === 'password') {
      setPassword(value);
    }
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
    validationData,
    handleInputChange,
    handleSubmit,
  };
};
