import { Box } from "@mui/material";
import { FC } from "react";
import RecipeForm from "./new/RecipeForm";
import { width } from "../styles/theme";
import { newRecipe } from "../types/recipe";

const RecipeNew: FC = () => {
  return (
    <Box width={width} marginTop={4} marginBottom={4}>
      <RecipeForm initState={newRecipe} />
    </Box>
  );
};

export default RecipeNew;