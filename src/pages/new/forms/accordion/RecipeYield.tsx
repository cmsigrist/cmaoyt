import { FC, useEffect, useState } from "react";
import { YieldType } from "../../../../types/recipe";
import {
  Stack,
  Typography,
  Paper,
  IconButton,
  InputBase,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

type RecipeYieldProps = {
  recipeYield: YieldType;
  handleUpdate: (y: YieldType) => void;
};

const RecipeYield: FC<RecipeYieldProps> = ({ recipeYield, handleUpdate }) => {

  return (
    <Stack direction={"column"}>
      <Stack
        direction={"row"}
        spacing={2}
        alignItems={"center"}
        marginBottom={2}
      >
        <Typography>Quantity:</Typography>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 120,
          }}
        >
          <IconButton
            sx={{ p: "10px" }}
            size="small"
            onClick={() =>
              handleUpdate({
                ...recipeYield,
                quantity: recipeYield.quantity + 1,
              })
            }
          >
            <AddIcon fontSize="inherit" />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder=""
            value={recipeYield.quantity}
            onChange={(event) =>
              handleUpdate({
                ...recipeYield,
                quantity: Number.parseInt(event.target.value),
              })
            }
          />
          <IconButton
            size="small"
            type="button"
            sx={{ p: "10px" }}
            onClick={() =>
              handleUpdate({
                ...recipeYield,
                quantity:
                  recipeYield.quantity > 0 ? recipeYield.quantity - 1 : 0,
              })
            }
          >
            <RemoveIcon fontSize="inherit" />
          </IconButton>
        </Paper>
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
    </Stack>
  );
};

export default RecipeYield;
