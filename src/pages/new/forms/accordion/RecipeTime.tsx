// React
import { FC } from "react";
// MUI
import {
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
// Components
// Hooks
// Utils
// Types
import { TimeType } from "../../../../types/recipe";
// Icons

type RecipeTimeProps = {
  recipeTime: TimeType;
  handleUpdate: (time: TimeType) => void;
  invalidInput?: string;
};

const RecipeTime: FC<RecipeTimeProps> = ({
  recipeTime,
  handleUpdate,
  invalidInput,
}) => {
  return (
    <Stack direction="row" spacing={1}>
      <TextField
        id="outlined-required"
        value={recipeTime.time}
        size="small"
        type="number"
        onChange={(event) =>
          handleUpdate({
            ...recipeTime,
            time: Number.parseInt(event.target.value),
          })
        }
        error={invalidInput !== undefined && invalidInput !== ""}
        helperText={invalidInput}
      />
      <FormControl fullWidth sx={{ maxWidth: "30%" }}>
        <InputLabel id="demo-simple-select-label">Unit</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={recipeTime.unit}
          label="Unit"
          size="small"
          onChange={(event) =>
            handleUpdate({ ...recipeTime, unit: event.target.value })
          }
        >
          <MenuItem value={"min"}>Minute</MenuItem>
          <MenuItem value={"h"}>Hour</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
};

export default RecipeTime;
