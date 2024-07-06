import { FC } from "react";
import { RecipeInfo } from "../types/recipe";
import {
  Typography,
  Stack,
  Box,
  Button,
  Divider,
  CircularProgress,
  Grid,
} from "@mui/material";
import { theme } from "../styles/theme";
import EditIcon from "@mui/icons-material/Edit";
import { ROUTE_EDIT_RECIPE } from "../routes";
import { Link } from "react-router-dom";
import Loading from "./Loading";

type RecipeDisplayProps = {
  recipe?: RecipeInfo;
  preview: boolean;
  imgPreviewURL?: string;
};

const RecipeDisplay: FC<RecipeDisplayProps> = ({
  recipe,
  preview,
  imgPreviewURL,
}) => {
  return (
    <>
      {recipe !== undefined ? (
        <>
          <Typography
            textAlign={"center"}
            variant="h2"
            color={theme.palette.primary.main}
            marginBottom={6}
          >
            {recipe.title}
          </Typography>
          <Grid
            width={"100%"}
            container
            columnSpacing={{ xs: 0, md: 2}}
            rowSpacing={3}
            marginBottom={3}
            justifyContent={"space-between"}
          >
            <Grid item xs={12} md={6} lg={5}>
              <img
                src={preview ? imgPreviewURL : recipe.imgURL}
                alt={recipe.title}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
              />
            </Grid>
            {recipe.quote !== undefined && (
              <Grid item md={preview ? 6 : 5}>
                <Stack
                  direction={"column"}
                  height={"100%"}
                  justifyContent={"center"}
                >
                  <Box sx={{ width: 30, height: 30 }}>
                    <svg
                      color={theme.palette.secondary.main}
                      aria-hidden="true"
                      viewBox="0 0 24 27"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                        fill="currentColor"
                      />
                    </svg>
                  </Box>
                  <Typography fontStyle={"italic"} variant="h6" marginTop={1}>
                    "{recipe.quote.content}"
                  </Typography>
                  <Typography variant="h6" marginLeft={4}>
                    — {recipe.quote.author}
                  </Typography>
                </Stack>
              </Grid>
            )}

            {!preview && (
              <Grid item>
                <Box>
                  <Link
                    to={ROUTE_EDIT_RECIPE(
                      recipe.type,
                      recipe.id,
                      recipe.category
                    )}
                  >
                    <Button
                      variant="outlined"
                      startIcon={<EditIcon />}
                      sx={{ lineHeight: 2 }}
                    >
                      Edit
                    </Button>
                  </Link>
                </Box>
              </Grid>
            )}
          </Grid>
          <Divider />
          <Stack
            maxWidth={200}
            direction={"row"}
            marginTop={2}
            spacing={2}
            justifyContent={"space-between"}
          >
            <Typography fontWeight={"bold"}>YIELD</Typography>
            <Typography>
              {recipe.yield.quantity} {recipe.yield.piece}
            </Typography>
          </Stack>
          <Stack
            maxWidth={200}
            direction={"row"}
            spacing={2}
            justifyContent={"space-between"}
          >
            <Typography fontWeight={"bold"}>TIME</Typography>
            <Typography>
              {recipe.preparationTime.time} {recipe.preparationTime.unit}
            </Typography>
          </Stack>
          {recipe.ovenTemperature !== undefined && (
            <Stack
              maxWidth={200}
              direction={"row"}
              spacing={2}
              justifyContent={"space-between"}
            >
              <Typography fontWeight={"bold"}>OVEN</Typography>
              <Typography>{recipe.ovenTemperature} °C</Typography>
            </Stack>
          )}
          <Divider sx={{ marginTop: 2 }} />
          <Typography fontWeight={"bold"} marginY={2}>
            INGREDIENTS
          </Typography>
          <Box marginLeft={2} marginBottom={2}>
            {recipe.ingredients.map((ingredient, i) => (
              <Typography key={i}>- {ingredient}</Typography>
            ))}
          </Box>
          <Divider />
          <Typography fontWeight={"bold"} marginY={2}>
            PREPARATION
          </Typography>
          <Box marginBottom={2}>
            {recipe.preparation.map((step, i) => (
              <Stack marginBottom={2} key={i}>
                <Typography fontWeight={"bold"}>Step {i + 1}</Typography>
                <Typography marginLeft={2}>{step}</Typography>
              </Stack>
            ))}
          </Box>
          <Divider />
          {recipe.source !== undefined && (
            <Typography variant="body2" marginTop={2}>
              Source: {recipe.source.content} — {recipe.source.author}
            </Typography>
          )}
        </>
      ) : (
        <Loading fullHeight />
      )}
    </>
  );
};

export default RecipeDisplay;
