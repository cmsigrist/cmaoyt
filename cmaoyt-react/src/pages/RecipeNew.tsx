import { Box } from "@mui/material";
import { FC } from "react";
import RecipeForm from "./new/RecipeForm";

const RecipeNew: FC = () => {
  return (
    <Box width={"80%"} marginTop={4} marginBottom={4}>
      <RecipeForm />
    </Box>
  );
};

export default RecipeNew;