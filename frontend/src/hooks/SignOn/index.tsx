import { useState } from 'react';
import { fetchSignUp } from '../../utils/api';

export const useSignOnPageLogic = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [error, setError] = useState('');
  const minPasswordLength = 3;

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
    minPasswordLength,
    handleInputChange,
    handleSubmit,
  };
};
