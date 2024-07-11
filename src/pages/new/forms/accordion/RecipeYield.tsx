// React
import { FC } from "react";
// MUI
import {
  Stack,
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
// Components
// Hooks
// Utils
// Types
import { YieldType } from "../../../../types/recipe";
// Icons

type RecipeYieldProps = {
  recipeYield: YieldType;
  handleUpdate: (y: YieldType) => void;
  invalidInput?: string;
};

const RecipeYield: FC<RecipeYieldProps> = ({
  recipeYield,
  handleUpdate,
  invalidInput,
}) => {
  return (
    <Stack direction={"column"}>
      <Stack
        direction={"row"}
        spacing={2}
        alignItems={"center"}
        marginBottom={2}
      >
        <Typography>Quantity:</Typography>
        <TextField
          id="outlined-required"
          value={recipeYield.quantity}
          size="small"
          type="number"
          onChange={(event) =>
            handleUpdate({
              ...recipeYield,
              quantity: Number.parseInt(event.target.value),
            })
          }
          error={invalidInput !== undefined && invalidInput !== ""}
          helperText={invalidInput}
        />
      </Stack>
      <Stack direction={"row"} spacing={2} alignItems={"center"}>
        <Typography>Serving:</Typography>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="people"
              control={
                <Radio
                  size="small"
                  sx={{
                    paddingTop: 1,
                    "& .MuiSvgIcon-root": {
                      fontSize: 20,
                    },
                  }}
                  checked={recipeYield.piece === "people"}
                  onChange={(event) =>
                    handleUpdate({ ...recipeYield, piece: event.target.value })
                  }
                />
              }
              label="People"
            />
            <Stack direction={"row"}>
              <FormControlLabel
                value=""
                control={
                  <Radio
                    size="small"
                    sx={{
                      paddingTop: 1,
                      "& .MuiSvgIcon-root": {
                        fontSize: 20,
                      },
                    }}
                    checked={recipeYield.piece !== "people"}
                    onChange={(event) =>
                      handleUpdate({
                        ...recipeYield,
                        piece: event.target.value,
                      })
                    }
                  />
                }
                label="Other:"
              />
              <TextField
                fullWidth
                disabled={recipeYield.piece === "people"}
                id="outlined-required"
                value={recipeYield.piece}
                size="small"
                label="Serving"
                onChange={(event) =>
                  handleUpdate({ ...recipeYield, piece: event.target.value })
                }
              />
            </Stack>
          </RadioGroup>
        </FormControl>
      </Stack>
      {invalidInput !== undefined && invalidInput !== "" && (
        <Typography mt={2} variant="subtitle2" color={"error"}>
          {invalidInput}
        </Typography>
      )}
    </Stack>
  );
};

export default RecipeYield;
