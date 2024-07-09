// React
import { FC, useEffect, useState } from "react";
// MUI
import { Box } from "@mui/material";
// Components
import RecipeDisplay from "../components/RecipeDisplay";
// Hooks
import { useParams } from "react-router-dom";
// Utils
import { fetchRecipe } from "../firebase/database";
import { width } from "../styles/theme";
// Types
import { RecipeInfo, RecipeType } from "../types/recipe";
// Icons


const Recipe: FC = () => {
  const { type, categoryId, recipeId } = useParams();
  const [recipe, setRecipe] = useState<RecipeInfo>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (recipeId !== undefined && type !== undefined) {
      fetchRecipe(
        recipeId,
        type as RecipeType,
        setRecipe,
        setLoading,
        setError,
        categoryId
      );
    }
  }, []);

  return (
    <Box width={width} marginTop={4} marginBottom={4}>
      <RecipeDisplay recipe={recipe} preview={false} />
    </Box>
  );
};

export default Recipe;
