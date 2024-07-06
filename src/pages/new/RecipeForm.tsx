import { Stack, Box, useMediaQuery, useTheme, Tab, Tabs } from "@mui/material";
import { FC, useEffect, useState } from "react";
import {
  RecipeInfo,
  RecipeType,
  TimeType,
  YieldType,
  emptyRecipe,
} from "../../types/recipe";
import { useParams } from "react-router-dom";
import RecipeDisplay from "../../components/RecipeDisplay";
import preview from "../../assets/espresso_cookies.jpg";
import { dummy } from "../../components/dummies";
import RecipeActions from "./forms/RecipeActions";
import RecipeAccordion from "./forms/RecipeAccordion";
import { DefaultTabPanelProps, TabPanel } from "../../components/TabPanel";

const RecipeForm: FC = () => {
  const { type, category, recipeID } = useParams();
  const [recipe, setRecipe] = useState<RecipeInfo>(emptyRecipe);
  const [image, setImage] = useState<Blob | MediaSource>();
  const isEditMode = type !== undefined && recipeID !== undefined;
  const newYield: YieldType = { quantity: 0, piece: "people" };
  const newTime: TimeType = { time: 0, unit: "min" };
  const newRecipe: RecipeInfo = {
    id: "",
    title: "Recipe title",
    ingredients: [],
    preparation: [],
    yield: newYield,
    preparationTime: newTime,
    ovenTemperature: undefined,
    quote: undefined,
    type: RecipeType.Desserts,
    source: undefined,
    imgURL: "",
    category: undefined,
    language: undefined,
  };
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    if (isEditMode) {
      //fetch recipe
      setRecipe(dummy);
    } else {
      setRecipe(newRecipe);
    }
  }, []);

  useEffect(() => {
    console.log(recipe);
  }, [recipe]);

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      {!md && (
        <Box sx={{ width: "100%"}}>
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
              />
              <RecipeActions
                recipe={recipe}
                setRecipe={setRecipe}
                image={image}
                isEditMode={isEditMode}
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
            />
            <RecipeActions
              recipe={recipe}
              setRecipe={setRecipe}
              image={image}
              isEditMode={isEditMode}
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
