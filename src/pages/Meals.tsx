import { Box, Typography, useTheme } from '@mui/material';
import { FC } from 'react';
import RecipeGrid from '../components/RecipeGrid';
import { RecipeType } from '../types/recipe';
import { width } from '../styles/theme';

const Meals: FC = () => {
  const theme = useTheme();

  return (
    <Box width={width} marginTop={4} marginBottom={4}>
      <RecipeGrid type={RecipeType.Meals} />
    </Box>
  );
};

export default Meals;
