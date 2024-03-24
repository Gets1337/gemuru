import React from 'react';
import { Typography, Container, Box, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <Container maxWidth="sm">
      <Box textAlign="center" mt={8}>
        <Typography variant="h4" component="h1" gutterBottom>
          404 - Страница не найдена
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
          Извините, запрашиваемая вами страница не существует или набрана
          неправильно.
        </Typography>
        <Typography variant="body1" component="p">
          Перейти на{' '}
          <Link component={RouterLink} to="/">
            главную страницу
          </Link>
          .
        </Typography>
      </Box>
    </Container>
  );
};
