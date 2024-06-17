import { FC } from 'react';
import { CategoryMetadata, Metadata, RecipeMetadata } from '../types/recipe';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  ImageList,
  ImageListItem,
  Stack,
  Typography,
} from '@mui/material';
import { ROUTE_CATEGORY, ROUTE_RECIPE } from '../routes';
import { Link } from 'react-router-dom';
import dummy from '../assets/espresso_cookies.jpg';

const RecipeThumbnail: FC<{ metadata: Metadata }> = ({ metadata }) => {
  const isCategory = metadata.recipes !== undefined;
  const route = isCategory
    ? ROUTE_CATEGORY(
        metadata.type,
        (metadata as CategoryMetadata).category.toLowerCase().replace(' ', '_')
      )
    : ROUTE_RECIPE(metadata.type, (metadata as RecipeMetadata).id);
  return (
    <Stack
      width={'100%'}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Card
        sx={{
          width: '90%',
          maxWidth: '350px',
          height: '480px',
          marginBottom: 2,
          justifySelf: 'center',
          alignSelf: 'center',
        }}
      >
        <CardActionArea>
          <Link to={route}>
            <CardMedia
              component="img"
              height="480px"
              image={dummy}
              alt={metadata.title}
            />
          </Link>
        </CardActionArea>
      </Card>
      <Link to={route} style={{ textDecoration: 'none' }}>
        <Typography variant="body1" color={'black'} textAlign={'center'}>
          {metadata.title}
        </Typography>
      </Link>
    </Stack>
  );
};

export default RecipeThumbnail;
