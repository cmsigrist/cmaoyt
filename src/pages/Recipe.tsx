import { FC, useEffect, useState } from "react";
import { RecipeInfo, RecipeType } from "../types/recipe";
import { useParams } from "react-router-dom";

import { Box } from "@mui/material";
import RecipeDisplay from "../components/RecipeDisplay";
import { width } from "../styles/theme";
import { fetchRecipe } from "../firebase/database";

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
