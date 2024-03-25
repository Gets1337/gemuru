import { useState, useMemo } from 'react';
import { fetchSignUp } from '../../utils/api';
import { minPasswordLength } from '../../utils/const';

export const useSignOn = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const isValidateForm = useMemo(() => {
    return (
      username.trim() !== '' &&
      login.trim() !== '' &&
      password.trim().length >= minPasswordLength &&
      repeatPassword.trim().length >= minPasswordLength &&
      password === repeatPassword &&
      email.trim() !== ''
    );
  }, [username, email, login, password, repeatPassword]);

  const isPasswordLengthInvalid = useMemo(() => {
    return (
      password.trim().length > 0 && password.trim().length < minPasswordLength
    );
  }, [password]);

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
    isValidateForm,
    error,
    isPasswordLengthInvalid,
    minPasswordLength,
    handleInputChange,
    handleSubmit,
  };
};
