import { FC } from "react";
import { RecipeInfo } from "../../../types/recipe";
import { Button, Stack } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

type RecipeActionProps = {
  recipe: RecipeInfo;
  setRecipe: (recipe: RecipeInfo) => void;
  image?: Blob | MediaSource;
  isEditMode: boolean;
};

const RecipeActions: FC<RecipeActionProps> = ({
  recipe,
  setRecipe,
  image,
  isEditMode,
}) => {
  const marshallRecipe = (recipe: RecipeInfo) => {
    return recipe;
  };

  const exportRecipe = () => {
    const marshalledRecipe = marshallRecipe(recipe);

    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(marshalledRecipe)
    )}`;

    const link = document.createElement("a");
    link.href = jsonString;
    link.download = marshalledRecipe.id + ".json";
    link.click();
  };

  const importRecipe = (e: any) => {
    const file = e.target.files[0];
    console.log(file.name);
    fetch(URL.createObjectURL(file))
      .then((response) => response.json())
      .then((importedRecipe) => {
        console.log(importedRecipe);
        const newRecipe: RecipeInfo = {
          id: importedRecipe.id,
          title: importedRecipe.title,
          ingredients: importedRecipe.ingredients,
          preparation: importedRecipe.preparation,
          yield: importedRecipe.yield,
          preparationTime: importedRecipe.preparationTime,
          type: importedRecipe.type,
          imgURL: importedRecipe.imgURL,
        };

        if (importedRecipe.ovenTemperature !== undefined) {
          newRecipe.ovenTemperature = importedRecipe.ovenTemperature;
        }
        if (importedRecipe.quote !== undefined) {
          newRecipe.quote = importedRecipe.quote;
        }
        if (importedRecipe.source !== undefined) {
          newRecipe.source = importedRecipe.source;
        }
        if (importedRecipe.category !== undefined) {
          newRecipe.category = importedRecipe.category;
        }

        setRecipe(newRecipe);
      })
      .catch((e) => console.log(console.error(e)));
  };

  return (
    <Stack marginTop={3} direction={"row"} spacing={1} justifyContent={"space-between"}>
      <Button variant="contained" startIcon={<CloudUploadIcon />}>Upload Recipe</Button>
      <Button variant="outlined" startIcon={<DownloadIcon />}>Export Recipe</Button>
      <Button variant="outlined" startIcon={<UploadIcon />}>Import Recipe</Button>
    </Stack>
  );
};

export default RecipeActions;
