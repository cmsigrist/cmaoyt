import { Box, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import RecipeForm from "./new/RecipeForm";

const RecipeEdit: FC = () => {
  const theme = useTheme();

  return (
    <Box width={"80%"} marginTop={4} marginBottom={4}>
      <Typography
        color={theme.palette.primary.main}
        textAlign="center"
        marginBottom={6}
        variant="h2"
      >
        Edit
      </Typography>
      <RecipeForm />
    </Box>
  );
};

export default RecipeEdit;
