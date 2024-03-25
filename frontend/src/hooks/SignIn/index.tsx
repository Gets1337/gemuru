import { useState } from 'react';
import { fetchSignIn } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

// Todo в названии не нужно писать что это логика (Logic). Ты же ничего кроме логики сюда не можешь засунуть
// Тоже самое касательно суффикса Page. Это же не страница
// Просто useSignIn
export const useSignInPageLogic = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // Todo уже описал проблему в useSignOn
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
