import { useState } from 'react';
import { fetchSignUp } from '../../utils/api';

export const useSignOnPageLogic = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Todo отдельное состояние под валидацию формы создавать слишком дорого
  // Можно просто считать на лету. (useMemo)
  const [isFormValid, setIsFormValid] = useState(false);
  const [error, setError] = useState('');

  // Todo все что никак не изменяется в течении работы приложения мы выносим за пределы компонента
  const minPasswordLength = 3;

  // Todo опять же проблема. Если isFormValid переделать, то данная функция не нужна будет
  const validateForm = () => {
    return (
      username.trim() !== '' &&
      login.trim() !== '' &&
      password.trim().length >= minPasswordLength &&
      repeatPassword.trim().length >= minPasswordLength &&
      password === repeatPassword &&
      email.trim() !== ''
    );
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'login') {
      setLogin(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'repeatPassword') {
      setRepeatPassword(value);
    } else if (name === 'email') {
      setEmail(value);
    }

    // Todo Опять же весь этот код удалиться если переделать isFormValid ======
    setIsFormValid(validateForm());

    if (name === 'username' && value.trim() === '') {
      setIsFormValid(false);
    } else if (name === 'login' && value.trim() === '') {
      setIsFormValid(false);
    } else if (name === 'password' && value.trim().length < minPasswordLength) {
      setIsFormValid(false);
    } else if (
      name === 'repeatPassword' &&
      value.trim().length < minPasswordLength
    ) {
      setIsFormValid(false);
    } else if (name === 'email' && value.trim() === '') {
      setIsFormValid(false);
    }

    // ======
  };

  const handleSubmit = async (e: any, navigate: any) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      setError('Пароли не совпадают');
      return;
    }

    setIsLoading(true);

    try {
      await fetchSignUp(username, login, password, email);
      navigate('/login');
    } catch (error) {
      console.error('Ошибка регистрации:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    username,
    email,
    login,
    password,
    repeatPassword,
    isLoading,
    isFormValid,
    error,
    // Todo вот это можно вынести в отдельный файл const.ts и оттуда импортировать сразу же в компонент
    minPasswordLength,
    handleInputChange,
    handleSubmit,
  };
};
