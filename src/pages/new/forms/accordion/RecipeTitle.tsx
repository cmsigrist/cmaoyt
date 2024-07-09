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
import { RecipeType } from "../../../../types/recipe";
// Icons

type RecipeTitleProps = {
  title: string;
  type?: RecipeType;
  handleUpdate: (title: string, action: string) => void;
};
const RecipeTitle: FC<RecipeTitleProps> = ({ title, type, handleUpdate }) => {
  return (
    <Stack direction={"row"} spacing={1}>
      <TextField
        fullWidth
        required
        id="outlined-required"
        label="Title"
        size="small"
        value={title}
        onChange={(event) => handleUpdate(event.target.value, "title")}
      />
      <FormControl fullWidth sx={{ maxWidth: "30%" }}>
        <InputLabel id="demo-simple-select-label">Recipe type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type !== undefined ? type : RecipeType.Desserts}
          label="Recipe Type"
          size="small"
          onChange={(event) => handleUpdate(event.target.value, "type")}
        >
          <MenuItem value={RecipeType.Desserts}>Desserts</MenuItem>
          <MenuItem value={RecipeType.Meals}>Meals</MenuItem>
          <MenuItem value={RecipeType.Drinks}>Drinks</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
};

export default RecipeTitle;
