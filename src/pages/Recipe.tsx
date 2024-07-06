import { FC, useEffect, useState } from "react";
import { RecipeInfo, RecipeType } from "../types/recipe";
import { api_recipe } from "../api/axiosConfig";
import { useParams } from "react-router-dom";

import { Box } from "@mui/material";
import RecipeDisplay from "../components/RecipeDisplay";
import { dummy } from "../components/dummies";
import { width } from "../styles/theme";
import { fetchRecipe } from "../firebase/database";

const Recipe: FC = () => {
  const { type, id, category } = useParams();
  const [recipe, setRecipe] = useState<RecipeInfo>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id !== undefined && type !== undefined) {
      fetchRecipe(
        id,
        type as RecipeType,
        setRecipe,
        setLoading,
        setError,
        category
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
