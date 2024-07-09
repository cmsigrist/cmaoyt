// React
import { FC } from "react";
// MUI
import { Box } from "@mui/material";
// Components
import RecipeGrid from "../components/RecipeGrid";
// Hooks
import { useParams } from "react-router-dom";
// Utils
import { width } from "../styles/theme";
// Types
import { RecipeType } from "../types/recipe";
// Icons

const Category: FC = () => {
  const { type, categoryId } = useParams();

  return (
    <Box width={width} marginTop={4} marginBottom={4}>
      {type !== undefined && (
        <RecipeGrid type={type as RecipeType} categoryId={categoryId} />
      )}
    </Box>
  );
};

export default Category;
