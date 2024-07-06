import { Box, Typography, useTheme } from '@mui/material';
import { FC } from 'react';
import RecipeGrid from '../components/RecipeGrid';
import { RecipeType } from '../types/recipe';
import { width } from '../styles/theme';

const Drinks: FC = () => {
  const theme = useTheme();

  return (
    <Box width={width} marginTop={4} marginBottom={4}>
      <Typography
        color={theme.palette.primary.main}
        textAlign="center"
        marginBottom={6}
        variant="h2"
      >
        Drinks
      </Typography>
      <RecipeGrid type={RecipeType.Drinks} />
    </Box>
  );
};

export default Drinks;
