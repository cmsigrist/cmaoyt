import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Button,
  Stack,
  Box,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
  Typography,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FC, memo, useCallback, useEffect, useState } from "react";
import {
  RecipeInfo,
  RecipeType,
  TimeType,
  YieldType,
  emptyRecipe,
} from "../../types/recipe";
import { useParams } from "react-router-dom";
import RecipeDisplay from "../../components/RecipeDisplay";
import RecipeList from "./RecipeList";

const RecipeForm: FC = () => {
  const [recipe, setRecipe] = useState<RecipeInfo>(emptyRecipe);
  const { type, category, recipeID } = useParams();
  const isEditMode = type !== undefined && recipeID !== undefined;
  const newYield: YieldType = { quantity: 0, piece: "people" };
  const newTime: TimeType = { time: 0, unit: "min" };
  const newRecipe: RecipeInfo = {
    id: "",
    title: "",
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

  useEffect(() => {
    if (isEditMode) {
      //fetch recipe
    } else {
      setRecipe(newRecipe);
    }
  }, []);

  const handleUpdate = (payload: any, action: string) => {
    if (recipe !== undefined) {
      switch (action) {
        case "title":
          setRecipe({ ...recipe, title: payload });
          break;
        case "type":
          setRecipe({ ...recipe, type: payload });
          break;
        case "yield":
          setRecipe({ ...recipe, yield: payload });
          break;
        case "time":
          setRecipe({ ...recipe, preparationTime: payload });
          break;
        case "category":
          setRecipe({ ...recipe, category: payload });
          break;
        case "oven":
          setRecipe({ ...recipe, ovenTemperature: payload });
          break;
        case "quote":
          setRecipe({ ...recipe, quote: payload });
          break;
        case "source":
          setRecipe({ ...recipe, source: payload });
          break;
        case "image":
          setRecipe({ ...recipe, imgURL: payload });
          break;
      }
    }
  };

  // const ingredientList = memo()

  return (
    <Stack direction={"row"} spacing={2}>
      <Box width="50%">
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Recipe Title
          </AccordionSummary>
          <AccordionDetails>
            <Stack direction={"row"} spacing={1}>
              <TextField
                fullWidth
                required
                id="outlined-required"
                label="Title"
                defaultValue=""
                size="small"
                onChange={(target) =>
                  handleUpdate(target.target.value, "title")
                }
              />
              <FormControl fullWidth sx={{ maxWidth: "30%" }}>
                <InputLabel id="demo-simple-select-label">
                  Recipe type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={
                    recipe !== undefined ? recipe?.type : RecipeType.Desserts
                  }
                  label="Recipe Type"
                  size="small"
                  onChange={(target) =>
                    handleUpdate(target.target.value, "type")
                  }
                >
                  <MenuItem value={RecipeType.Desserts}>Desserts</MenuItem>
                  <MenuItem value={RecipeType.Meals}>Meals</MenuItem>
                  <MenuItem value={RecipeType.Drinks}>Drinks</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            Ingredients
          </AccordionSummary>
          <AccordionDetails>
            <RecipeList
              list={recipe.ingredients || []}
              type="ingredients"
              setRecipe={(ingredients) => setRecipe({ ...recipe, ingredients })}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            Preparation
          </AccordionSummary>
          <AccordionDetails>
          <RecipeList
              list={recipe.preparation || []}
              type="preparation"
              setRecipe={(preparation) => setRecipe({ ...recipe, preparation })}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4-content"
            id="panel4-header"
          >
            Yield
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel5-content"
            id="panel5-header"
          >
            Preparation Time
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel6-content"
            id="panel6-header"
          >
            Category
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel7-content"
            id="panel7-header"
          >
            Oven Temperature
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel8-content"
            id="panel8-header"
          >
            Quote
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel9-content"
            id="panel9-header"
          >
            Source
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel10-content"
            id="panel10-header"
          >
            Upload Image
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
          <AccordionActions>
            <Button>Cancel</Button>
            <Button>Agree</Button>
          </AccordionActions>
        </Accordion>
      </Box>
      <Box width="50%">
        <RecipeDisplay recipe={recipe} preview={true} />
      </Box>
    </Stack>
  );
};

export default RecipeForm;
