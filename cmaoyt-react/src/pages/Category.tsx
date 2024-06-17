import { Box, Typography, useTheme } from '@mui/material';
import { FC } from 'react';
import RecipeGrid from '../components/RecipeGrid';
import { RecipeType } from '../types/recipe';
import { useParams } from 'react-router-dom';

const Category: FC = () => {
  const theme = useTheme();
  const { category } = useParams();

  return (
    <Box width={'80%'} marginTop={4} marginBottom={4}>
      <Typography
        color={theme.palette.primary.main}
        textAlign="center"
        marginBottom={6}
        variant="h2"
      >
        {(category || '')
          .split('_')
          .map((w) => w[0].toUpperCase() + w.substring(1, w.length))
          .join(' ')}
      </Typography>
      <RecipeGrid type={RecipeType.Desserts} />
    </Box>
  );
};

export default Category;
