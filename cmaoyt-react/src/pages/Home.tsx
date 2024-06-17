import { FC, useState } from 'react';
import logo from '../assets/logo.png';
import { Box, Button, Typography } from '@mui/material';
import { RecipeInfo } from '../types/recipe';

const Home: FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        justifyItems: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <img
        alt="CMAOYT logo"
        src={logo}
        style={{
          maxWidth: '100%',
          height: 'auto',
          maxHeight: '83vh',
          alignSelf: 'center',
        }}
      />
    </Box>
  );
};

export default Home;
