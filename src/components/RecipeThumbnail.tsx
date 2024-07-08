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

const RecipeThumbnail: FC<{ metadata: Metadata; categoryId?: string }> = ({
  metadata,
  categoryId,
}) => {
  const isCategory = metadata instanceof CategoryMetadata;
  const route = isCategory
    ? ROUTE_CATEGORY(
        metadata.type,
        metadata.id
      )
    : ROUTE_RECIPE(
        metadata.type,
        metadata.id,
        categoryId
      );

  const img = () => {
    if (isCategory) {
      const categoryMetadata = metadata as CategoryMetadata;
      const recipes = categoryMetadata.recipes;

      if (recipes.length === 1) {
        return (
          <CardMedia
            component="img"
            image={recipes[0].imgURL}
            alt={categoryMetadata.title}
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
          image={(metadata as RecipeMetadata).imgURL}
          alt={(metadata as RecipeMetadata).title}
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
            ? metadata.title
                .split("_")
                .map((w) => w[0].toUpperCase() + w.substring(1))
                .join(" ")
            : metadata.title}
        </Typography>
      </Link>
    </Stack>
  );
};

export default RecipeThumbnail;
