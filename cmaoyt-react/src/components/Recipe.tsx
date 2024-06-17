import { FC, useEffect, useState } from 'react';
import { RecipeInfo, RecipeType } from '../types/recipe';
import { api_recipe } from '../api/axiosConfig';
import { useParams } from 'react-router-dom';
import dummyLogo from '../assets/espresso_cookies.jpg';

import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import RecipeDisplay from './RecipeDisplay';

const dummy: RecipeInfo = {
  id: '1',
  title: 'Cookies',
  ingredients: ['100g of butter', '200g of white sugar', '300g of chocolate'],
  preparation: [
    'Melt the butter',
    'Mix everything',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  ],
  yield: { quantity: 24, piece: 'pieces' },
  preparationTime: { time: 60, unit: 'min' },
  ovenTemperature: 200,
  quote: {
    content: 'Hi, the best cookies post hangover',
    author: 'me, and chief or captain',
  },
  source: { content: "Some child's book", author: 'me' },
  imgURL: dummyLogo,
  type: RecipeType.Desserts,
  category: 'More cookies',
  language: 'en',
};

const Recipe: FC = () => {
  const { type, id, category } = useParams();
  const theme = useTheme();
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
    <Box width={'80%'} marginTop={4} marginBottom={4}>
      <RecipeDisplay recipe={recipe} preview={false} />
    </Box>
  );
};

export default Recipe;
