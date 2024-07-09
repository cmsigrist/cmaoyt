// React
import { FC } from "react";
// MUI
import { Box } from "@mui/material";
// Components
import RecipeForm from "./new/RecipeForm";
// Hooks
// Utils
import { width } from "../styles/theme";
// Types
import { newRecipe } from "../types/recipe";
// Icons

const RecipeNew: FC = () => {
  return (
    <Box width={width} marginTop={4} marginBottom={4}>
      <RecipeForm initState={newRecipe} />
    </Box>
  );
};

export default RecipeNew;