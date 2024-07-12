// React
import { FC, useEffect, useState } from "react";
// MUI
import { Box, Typography, useTheme } from "@mui/material";
// Components
import RecipeForm from "./new/RecipeForm";
import Loading from "../components/Loading";
// Hooks
import { useParams } from "react-router-dom";
// Utils
import { width } from "../styles/theme";
import { fetchRecipe } from "../firebase/database";
// Types
import { RecipeInfo, RecipeType } from "../types/recipe";
// Icons

const RecipeEdit: FC = () => {
  const { type, categoryId, recipeId } = useParams();
  const [recipe, setRecipe] = useState<RecipeInfo>();
  const [_, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    if (recipeId !== undefined && type !== undefined) {
      fetchRecipe(
        recipeId,
        type as RecipeType,
        setRecipe,
        setLoading,
        categoryId
      );
    }
  }, []);

  return (
    <Box width={width} marginTop={4} marginBottom={4}>
      <Typography
        color={theme.palette.primary.main}
        textAlign="center"
        marginBottom={6}
        variant="h2"
      >
        Edit
      </Typography>
      {recipe !== undefined ? (
        <RecipeForm initState={recipe} isEditMode />
      ) : (
        <Loading />
      )}
    </Box>
  );
};

export default RecipeEdit;
