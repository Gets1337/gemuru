import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';

export const SignOnPage = () => {
  const [username, setusername] = useState('');
  const [email, setemail] = useState('');
  const [login, setlogin] = useState('');
  const [password, setpassword] = useState('');
  const [repeatpassword, setRepeatPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    return (
      username.trim() !== '' &&
      login.trim() !== '' &&
      password.trim() !== '' &&
      repeatpassword.trim() !== '' &&
      email.trim() !== ''
    );
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (password !== repeatpassword) {
      setError('Пароли не совпадают');
      return;
    }

    setIsLoading(true);

    try {
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
    } else if (name === 'password' && value.trim() === '') {
      setIsFormValid(false);
    } else if (name === 'repeatpassword' && value.trim() === '') {
      setIsFormValid(false);
    } else if (name === 'email' && value.trim() === '') {
      setIsFormValid(false);
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          {isLoading ? (
            <CircularProgress color="inherit" size={24} />
          ) : (
            <LockOutlinedIcon />
          )}
        </Avatar>
        <Typography component="h1" variant="h5">
          Регистрация
        </Typography>
        <Box component="form" minWidth="100%" noValidate sx={{ mt: 3 }}>
          <Stack spacing={2}>
            <TextField
              required
              fullWidth
              id="username"
              label="Имя пользователя"
              name="username"
              value={username}
              onChange={handleInputChange}
            />
            <TextField
              required
              fullWidth
              name="login"
              label="Логин"
              type="login"
              id="login"
              value={login}
              onChange={handleInputChange}
            />
            <TextField
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              value={password}
              onChange={handleInputChange}
            />
            <TextField
              required
              fullWidth
              name="repeatpassword"
              label="Повторите пароль"
              type="password"
              id="repeatpassword"
              value={repeatpassword}
              onChange={handleInputChange}
            />
            <TextField
              required
              fullWidth
              id="email"
              label="Почта"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
          </Stack>

          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={!isFormValid || isLoading}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, height: '56px' }}
          >
            Зарегистрироваться
          </Button>
          <Stack direction="row" justifyContent="flex-end">
            <Link href="/login" variant="body2">
              У вас уже есть аккаунт? Войти
            </Link>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};
