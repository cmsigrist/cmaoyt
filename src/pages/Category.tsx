import { Box } from "@mui/material";
import { FC } from "react";
import RecipeGrid from "../components/RecipeGrid";
import { RecipeType } from "../types/recipe";
import { useParams } from "react-router-dom";
import { width } from "../styles/theme";

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
