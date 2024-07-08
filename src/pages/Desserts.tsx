import { FC } from 'react';
import { RecipeType } from '../types/recipe';
import { Box, Typography, useTheme } from '@mui/material';
import RecipeGrid from '../components/RecipeGrid';
import { width } from '../styles/theme';

const Desserts: FC = () => {
  const theme = useTheme();

  return (
    <Box width={width} marginTop={4} marginBottom={4}>
      <RecipeGrid type={RecipeType.Desserts} />
    </Box>
  );
};

export default Desserts;
