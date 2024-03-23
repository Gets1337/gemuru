import React from 'react';
import { Typography, Container, Box } from '@mui/material';

export const NotFoundPage = () => {
  return (
    <Container maxWidth="sm">
      <Box textAlign="center" mt={8}>
        <Typography variant="h4" component="h1" gutterBottom>
          404 - Страница не найдена
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
          Извините, запрашиваемая вами страница не существует или набранна
          неправильно.
        </Typography>
      </Box>
    </Container>
  );
};
