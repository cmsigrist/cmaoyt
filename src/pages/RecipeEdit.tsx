import { Box, Typography, useTheme } from "@mui/material";
import { FC, useEffect, useState } from "react";
import RecipeForm from "./new/RecipeForm";
import { width } from "../styles/theme";
import { useParams } from "react-router-dom";
import { fetchRecipe } from "../firebase/database";
import { RecipeInfo, RecipeType } from "../types/recipe";
import Loading from "../components/Loading";

const RecipeEdit: FC = () => {
  const { type, categoryId, recipeId } = useParams();
  const [recipe, setRecipe] = useState<RecipeInfo>();
  const [_, setLoading] = useState(true);
  const [error, setError] = useState("");
  const theme = useTheme();

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
