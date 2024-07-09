// React
import { FC, useState } from "react";
// MUI
import { Stack, Box, useMediaQuery, useTheme, Tab, Tabs } from "@mui/material";
// Components
import RecipeDisplay from "../../components/RecipeDisplay";
import RecipeActions from "./forms/RecipeActions";
import RecipeAccordion from "./forms/RecipeAccordion";
import { DefaultTabPanelProps, TabPanel } from "../../components/TabPanel";
// Hooks
// Utils
import preview from "../../assets/espresso_cookies.jpg";
import { initChecks } from "../../util/inputValidation";
// Types
import { RecipeInfo } from "../../types/recipe";
// Icons

const RecipeForm: FC<{ initState: RecipeInfo; isEditMode?: boolean }> = ({
  initState,
  isEditMode = false,
}) => {
  const [recipe, setRecipe] = useState<RecipeInfo>(initState);
  const [image, setImage] = useState<Blob | MediaSource | undefined>(undefined);
  const [invalidInputs, setInvalidInputs] = useState<Map<string, string>>(
    new Map(initChecks())
  );

  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up("md"));

  const [value, setValue] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      {!md && (
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Recipe" {...DefaultTabPanelProps(0)} />
              <Tab label="Preview" {...DefaultTabPanelProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <>
              <RecipeAccordion
                recipe={recipe}
                setRecipe={setRecipe}
                setImage={setImage}
                invalidInputs={invalidInputs}
                setInvalidInputs={setInvalidInputs}
              />
              <RecipeActions
                recipe={recipe}
                setRecipe={setRecipe}
                image={image}
                isEditMode={isEditMode}
                invalidInputs={invalidInputs}
                setInvalidInputs={setInvalidInputs}
              />
            </>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <RecipeDisplay
              recipe={recipe}
              preview={true}
              imgPreviewURL={
                image !== undefined
                  ? URL.createObjectURL(image)
                  : recipe.imgURL !== ""
                  ? recipe.imgURL
                  : preview
              }
            />
          </TabPanel>
        </Box>
      )}
      {md && (
        <Stack direction={"row"} spacing={2} width={"100%"}>
          <Box width="50%">
            <RecipeAccordion
              recipe={recipe}
              setRecipe={setRecipe}
              setImage={setImage}
              invalidInputs={invalidInputs}
              setInvalidInputs={setInvalidInputs}
            />
            <RecipeActions
              recipe={recipe}
              setRecipe={setRecipe}
              image={image}
              isEditMode={isEditMode}
              invalidInputs={invalidInputs}
              setInvalidInputs={setInvalidInputs}
            />
          </Box>
          <Box width="50%">
            <RecipeDisplay
              recipe={recipe}
              preview={true}
              imgPreviewURL={
                image !== undefined
                  ? URL.createObjectURL(image)
                  : recipe.imgURL !== ""
                  ? recipe.imgURL
                  : preview
              }
            />
          </Box>
        </Stack>
      )}
    </>
  );
};

export default RecipeForm;
