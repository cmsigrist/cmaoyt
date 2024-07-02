import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Stack,
  Box,
  useTheme,
  styled,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  RecipeInfo,
  RecipeType,
  TimeType,
  YieldType,
  emptyRecipe,
} from "../../types/recipe";
import { useParams } from "react-router-dom";
import RecipeDisplay from "../../components/RecipeDisplay";
import RecipeList from "./forms/RecipeList";
import RecipeYield from "./forms/RecipeYield";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import preview from "../../assets/espresso_cookies.jpg";
import RecipeCategory from "./forms/RecipeCategory";
import RecipeTitle from "./forms/RecipeTitle";
import RecipeTime from "./forms/RecipeTime";
import RecipeOven from "./forms/RecipeOven";
import RecipeQuote from "./forms/RecipeQuote";
import { dummy } from "../../components/dummies";
import RecipeActions from "./RecipeActions";

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

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

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

  const handleUpdate = (payload: any, action: string) => {
    if (recipe !== undefined) {
      switch (action) {
        case "title":
          setRecipe({ ...recipe, title: payload });
          break;
        case "type":
          setRecipe({ ...recipe, type: payload });
          break;
      }
    }
  };

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    console.log(file);
    setImage(file);
  };

  return (
    <Stack direction={"row"} spacing={2} width={"100%"}>
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
            <RecipeTitle
              title={recipe.title}
              type={recipe.type}
              handleUpdate={handleUpdate}
            />
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
            <RecipeYield
              recipeYield={recipe.yield}
              handleUpdate={(y) => setRecipe({ ...recipe, yield: y })}
            />
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
            <RecipeTime
              recipeTime={recipe.preparationTime}
              handleUpdate={(time) =>
                setRecipe({ ...recipe, preparationTime: time })
              }
            />
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
            <RecipeCategory
              category={recipe.category}
              handleUpdate={(category) => {
                if (category !== "none") {
                  setRecipe({ ...recipe, category });
                }
              }}
            />
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
            <RecipeOven
              temperature={recipe.ovenTemperature}
              handleUpdate={(ovenTemperature) =>
                setRecipe({ ...recipe, ovenTemperature })
              }
            />
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
            <RecipeQuote
              quote={recipe.quote}
              type="quote"
              handleUpdate={(quote) => setRecipe({ ...recipe, quote })}
            />
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
            <RecipeQuote
              quote={recipe.source}
              type="source"
              handleUpdate={(source) => setRecipe({ ...recipe, source })}
            />
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
            <Button
              size="small"
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              sx={{
                width: "100%",
                backgroundColor: theme.palette.primary.light,
              }}
            >
              Upload Image
              <VisuallyHiddenInput type="file" onChange={handleImage} />
            </Button>
          </AccordionDetails>
        </Accordion>
        <RecipeActions recipe={recipe} setRecipe={setRecipe} image={image} isEditMode={isEditMode} />
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
  );
};

export default RecipeForm;
