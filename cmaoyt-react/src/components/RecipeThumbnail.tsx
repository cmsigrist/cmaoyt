import { FC } from "react";
import { CategoryMetadata, Metadata, RecipeMetadata } from "../types/recipe";
import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { ROUTE_CATEGORY, ROUTE_RECIPE } from "../routes";
import { Link } from "react-router-dom";
// import dummy from '../assets/espresso_cookies.jpg';

const RecipeThumbnail: FC<{ metadata: Metadata }> = ({ metadata }) => {
  const isCategory = metadata instanceof CategoryMetadata;
  const route = isCategory
    ? ROUTE_CATEGORY(
        metadata.type,
        (metadata as CategoryMetadata).getTitle.toLowerCase().replace(" ", "_")
      )
    : ROUTE_RECIPE(metadata.type, (metadata as RecipeMetadata).id);

  const img = () => {
    if (isCategory) {
      const categoryMetadata = metadata as CategoryMetadata;
      const recipes = categoryMetadata.getRecipes;

      if (recipes.length === 1) {
        return (
          <CardMedia
            component="img"
            image={recipes[0].imgURL}
            alt={categoryMetadata.getTitle}
          />
        );
      }
      if (recipes.length >= 2 && recipes.length < 4) {
        return (
          <Grid width={"100%"} height={"100%"} container>
            {recipes.slice(0, 2).map((recipe, i) => (
              <Grid key={i} item xs={6}>
                <img
                  src={recipe.imgURL}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Grid>
            ))}
          </Grid>
        );
      }
      return (
        <Grid
          width={"100%"}
          height={"100%"}
          container
          gridRow={2}
          gridColumn={2}
        >
          {recipes.slice(0, 4).map((recipe, i) => (
            <Grid width={"100%"} height={"100%"} key={i} container>
              <Grid key={i} item xs={6}>
                <img
                  src={recipe.imgURL}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Grid>
            </Grid>
          ))}
        </Grid>
      );
    } else {
      return (
        <CardMedia
          component="img"
          image={(metadata as RecipeMetadata).getImgURL}
          alt={(metadata as RecipeMetadata).getTitle}
          sx={{ height: "100%", width: "100%" }}
        />
      );
    }
  };

  return (
    <Stack
      width={"100%"}
      height={"100%"}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Card
        sx={{
          height: "100%",
          width: "100%",
          marginBottom: 2,
          justifySelf: "center",
          alignSelf: "center",
        }}
      >
        <CardActionArea
          sx={{
            height: "100%",
            width: "100%",
          }}
        >
          <Link to={route}>{img()}</Link>
        </CardActionArea>
      </Card>
      <Link to={route} style={{ textDecoration: "none", flexGrow: 0 }}>
        <Typography variant="body1" color={"black"} textAlign={"center"}>
          {isCategory
            ? metadata.getTitle
                .split("_")
                .map((w) => w[0].toUpperCase() + w.substring(1))
                .join(" ")
            : metadata.getTitle}
        </Typography>
      </Link>
    </Stack>
  );
};

export default RecipeThumbnail;
