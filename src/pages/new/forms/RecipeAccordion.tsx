// React
import { FC } from "react";
// MUI
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  useTheme,
} from "@mui/material";
// Components
import RecipeCategory from "./accordion/RecipeCategory";
import RecipeList from "./accordion/RecipeList";
import RecipeOven from "./accordion/RecipeOven";
import RecipeQuote from "./accordion/RecipeQuote";
import RecipeTime from "./accordion/RecipeTime";
import RecipeTitle from "./accordion/RecipeTitle";
import RecipeYield from "./accordion/RecipeYield";
import { HiddenInput } from "../../../components/HiddenInput";
// Hooks
// Utils
import { createId } from "../../../util/marshal";
// Types
import { RecipeInfo } from "../../../types/recipe";
// Icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

type RecipeAccordionProps = {
  recipe: RecipeInfo;
  setRecipe: (recipe: RecipeInfo) => void;
  setImage: (image: Blob | MediaSource) => void;
  invalidInputs: Map<string, string>
  setInvalidInputs: (i: Map<string, string>) => void
};

const RecipeAccordion: FC<RecipeAccordionProps> = ({
  recipe,
  setRecipe,
  setImage,
  invalidInputs,
  setInvalidInputs
}) => {
  const theme = useTheme();

  const handleUpdate = (payload: any, action: string) => {
    if (recipe !== undefined) {
      switch (action) {
        case "title":
          setRecipe({ ...recipe, id: createId(payload), title: payload });
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
    <>
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
            type={recipe.type}
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
            variant="contained"
            startIcon={<CloudUploadIcon />}
            sx={{
              width: "100%",
              backgroundColor: theme.palette.primary.light,
            }}
          >
            Upload Image
            <HiddenInput type="file" onChange={handleImage} />
          </Button>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default RecipeAccordion