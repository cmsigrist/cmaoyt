import { Box, Stack } from "@mui/material";
import { FC } from "react";
import RecipeForm from "./new/RecipeForm";
import RecipeDisplay from "../components/RecipeDisplay";
import RecipePreview from "./new/RecipePreview";

const Create: FC = () => {
  return (
    <Box width={"80%"} marginTop={4} marginBottom={4}>
      <Stack direction="row">
        <Box width={"40%"}>
        <RecipeForm />
        </Box>
        <Box width={"60%"}>
          <RecipePreview />
        </Box>
      </Stack>
    </Box>
  );
};

export default Create;
