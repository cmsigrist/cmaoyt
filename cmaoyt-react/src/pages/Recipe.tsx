import { FC, useEffect, useState } from 'react';
import { RecipeInfo, RecipeType } from '../types/recipe';
import { api_recipe } from '../api/axiosConfig';
import { useParams } from 'react-router-dom';

import {
  Box,
  useTheme,
} from '@mui/material';
import RecipeDisplay from '../components/RecipeDisplay';
import { dummy } from '../components/dummies';
import { width } from '../styles/theme';

const Recipe: FC = () => {
  const { type, id, category } = useParams();
  const [recipe, setRecipe] = useState<RecipeInfo>();

  useEffect(() => {
    if (type !== undefined) {
      api_recipe(type as RecipeType, category)
        .get(`/${id}`)
        .then((result) => setRecipe(result.data))
        .catch(() => {
          setRecipe(dummy);
        });
    }
    // .catch((reason) => console.error(reason));
  }, []);

  return (
    <Box width={width} marginTop={4} marginBottom={4}>
      <RecipeDisplay recipe={recipe} preview={false} />
    </Box>
  );
};

export default Recipe;
