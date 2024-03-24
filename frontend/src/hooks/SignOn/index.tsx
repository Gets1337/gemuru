import { useState } from 'react';

export const useSignOnPageLogic = () => {
  const [username, setusername] = useState('');
  const [email, setemail] = useState('');
  const [login, setlogin] = useState('');
  const [password, setpassword] = useState('');
  const [repeatpassword, setRepeatPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [error, setError] = useState('');
  const minPasswordLength = 3;

  const validateForm = () => {
    return (
      username.trim() !== '' &&
      login.trim() !== '' &&
      password.trim().length >= minPasswordLength &&
      repeatpassword.trim().length >= minPasswordLength &&
      password === repeatpassword &&
      email.trim() !== ''
    );
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setusername(value);
    } else if (name === 'login') {
      setlogin(value);
    } else if (name === 'password') {
      setpassword(value);
    } else if (name === 'repeatpassword') {
      setRepeatPassword(value);
    } else if (name === 'email') {
      setemail(value);
    }
    setIsFormValid(validateForm());

    if (name === 'username' && value.trim() === '') {
      setIsFormValid(false);
    } else if (name === 'login' && value.trim() === '') {
      setIsFormValid(false);
    } else if (name === 'password' && value.trim().length < minPasswordLength) {
      setIsFormValid(false);
    } else if (
      name === 'repeatpassword' &&
      value.trim().length < minPasswordLength
    ) {
      setIsFormValid(false);
    } else if (name === 'email' && value.trim() === '') {
      setIsFormValid(false);
    }
  };

  const handleSubmit = async (e: any, navigate: any) => {
    e.preventDefault();

    if (password !== repeatpassword) {
      setError('Пароли не совпадают');
      return;
    }

    setIsLoading(true);

    try {
      const controller = new AbortController();
      const signal = controller.signal;
      setTimeout(() => {
        controller.abort();
      }, 15000);

      const response = await fetch(
        'http://62.113.118.59:1337/api/user.register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            login,
            password,
            email,
          }),
          signal: signal,
        }
      );

      if (response.ok) {
        navigate('/login');
      } else {
        console.error('Ошибка регистрации');
      }
    } catch (error) {
      console.error('Ошибка сети', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    username,
    email,
    login,
    password,
    repeatpassword,
    isLoading,
    isFormValid,
    error,
    minPasswordLength,
    handleInputChange,
    handleSubmit,
  };
};
