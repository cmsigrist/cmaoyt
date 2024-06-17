import { FC, useEffect, useState } from 'react';
import { Metadata, RecipeMetadata, RecipeType } from '../types/recipe';
import RecipeThumbnail from './RecipeThumbnail';
import { api } from '../api/axiosConfig';
import { Box, Grid } from '@mui/material';

const dummies: Metadata[] = [
  {
    id: '0',
    title: 'Hello there',
    imgURL: '../assets/espresso_cookies.jpg',
    type: RecipeType.Desserts,
  } as Metadata,
  {
    id: '1',
    title: 'Cookies',
    imgURL: '../assets/espresso_cookies.jpg',
    type: RecipeType.Desserts,
  } as Metadata,
  {
    id: '2',
    title: 'Cookies',
    imgURL: '../assets/espresso_cookies.jpg',
    type: RecipeType.Desserts,
  } as Metadata,
  {
    title: 'Category',
    imgURL: '../assets/espresso_cookies.jpg',
    type: RecipeType.Desserts,
    category: 'More cookies',
    recipes: [
      {
        id: '0',
        title: 'Hello there',
        imgURL: '../assets/espresso_cookies.jpg',
        type: RecipeType.Desserts,
      },
    ],
  } as Metadata,
];

const RecipeGrid: FC<{ type: RecipeType }> = ({ type }) => {
  const [metadata, setMetadata] = useState<Metadata[]>([]);

  useEffect(() => {
    api(type)
      .get('/all')
      .then((result) => setMetadata(result.data))
      .catch(() => {
        setMetadata(dummies);
      });
    // .catch((reason) => console.error(reason));
  }, []);

  return (
    <Grid width={'100%'} container rowSpacing={3}>
      {metadata.map((m, i) => (
        <Grid key={i} item xs={12} sm={6} md={4}>
          <RecipeThumbnail metadata={m} />
        </Grid>
      ))}
    </Grid>
  );
};

export default RecipeGrid;
