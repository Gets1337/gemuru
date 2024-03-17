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
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      setError('Пароли не совпадают');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://62.113.118.59:1337/register', {
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
      });
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
              onChange={(e) => setusername(e.target.value)}
            />
            <TextField
              required
              fullWidth
              name="login"
              label="Логин"
              type="login"
              id="login"
              onChange={(e) => setlogin(e.target.value)}
            />
            <TextField
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              onChange={(e) => setpassword(e.target.value)}
            />
            <TextField
              required
              fullWidth
              name="repeatpassword"
              label="Повторите пароль"
              type="repeatPassword"
              id="repeatpassword"
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
            <TextField
              required
              fullWidth
              id="email"
              label="Почта"
              name="email"
              onChange={(e) => setemail(e.target.value)}
            />
          </Stack>

          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
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
