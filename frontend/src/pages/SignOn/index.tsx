import React from 'react';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSignOn } from '../../hooks/SignOn';
import { minPasswordLength } from '../../utils/const';

export const SignOnPage = () => {
  const {
    username,
    email,
    login,
    password,
    repeatPassword,
    isLoading,
    error,
    isValidateForm,
    isPasswordLengthInvalid,
    handleInputChange,
    handleSubmit,
  } = useSignOn();

  const navigate = useNavigate();

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
              error={isPasswordLengthInvalid}
              helperText={
                isPasswordLengthInvalid
                  ? `Минимальная длина ${minPasswordLength} символа`
                  : ''
              }
            />
            <TextField
              required
              fullWidth
              name="repeatPassword"
              label="Повторите пароль"
              type="password"
              id="repeatPassword"
              value={repeatPassword}
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
            onClick={(e) => handleSubmit(e, navigate)}
            disabled={!isValidateForm || isLoading}
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
