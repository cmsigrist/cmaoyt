import { FC } from "react";
import { TimeType } from "../../../types/recipe";
import {
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

type RecipeTimeProps = {
  recipeTime: TimeType;
  handleUpdate: (time: TimeType) => void;
};

const RecipeTime: FC<RecipeTimeProps> = ({ recipeTime, handleUpdate }) => {
  return (
    <Stack direction="row" spacing={1}>
      <TextField
        id="outlined-required"
        value={recipeTime.time}
        size="small"
        onChange={(event) =>
          handleUpdate({ ...recipeTime, time: Number.parseInt(event.target.value) })
        }
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