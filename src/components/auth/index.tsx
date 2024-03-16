import React, { useState } from 'react';
import LoginPage from '../auth/login/login.tsx';
import RegisterPage from '../auth/register/register.tsx';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

const AuthRootComponent = () => {
  const [login, setlogin] = useState<string>('');
  const [password, setpassword] = useState<string>('');
  const [username, setusername] = useState<string>('');
  const [email, setemail] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(username);
    console.log(email);
    console.log(login);
    console.log(password);

    try {
      const response = await fetch('http://5.167.226.121:25565/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, login, password }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Успешная регистрация', data);
        navigate('/login');
      } else {
        console.error('Ошибка регистрации');
      }
    } catch (error) {
      console.error('Ошибка сети', error);
    }
  };

  return (
    <div className="root">
      <div className="form" onSubmit={handleSubmit}>
        <Box>
          {location.pathname === '/login' ? (
            <LoginPage setlogin={setlogin} setpassword={setpassword} />
          ) : location.pathname === '/register' ? (
            <RegisterPage
              setusername={setusername}
              setemail={setemail}
              setlogin={setlogin}
              setpassword={setpassword}
            />
          ) : null}
        </Box>
      </div>
    </div>
  );
};

export default AuthRootComponent;
