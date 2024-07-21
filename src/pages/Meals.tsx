// React
import { FC } from 'react';
// MUI
import { Box, useTheme } from '@mui/material';
// Components
import RecipeGrid from '../components/RecipeGrid';
// Hooks
// Utils
import { width } from '../styles/theme';
// Types
import { RecipeType } from '../types/recipe';
// Icons

const Meals: FC = () => {
  const theme = useTheme();

  return (
    <Box width={width} marginTop={4} marginBottom={4}>
      <RecipeGrid type={RecipeType.Meals} />
    </Box>
  );
};

export default Meals;