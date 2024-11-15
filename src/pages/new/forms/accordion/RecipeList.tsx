// React
import { FC } from "react";
// MUI
import { Stack, TextField, IconButton, Button, Box } from "@mui/material";
// Components
// Hooks
// Utils
import { theme } from "../../../../styles/theme";
// Types
// Icons
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

type RecipeListProps = {
  list: string[];
  type: "ingredients" | "preparation";
  setRecipe: (list: string[]) => void;
  invalidInput?: string;
};
const RecipeList: FC<RecipeListProps> = ({
  list,
  type,
  setRecipe,
  invalidInput,
}) => {
  const handleUpdate = (
    payload: string,
    index: number,
    action: "add" | "remove" | "update"
  ) => {
    const ingredients = getUpdatedList(list, action, index, payload);
    setRecipe(ingredients);
  };

  const getUpdatedList = (
    list: string[],
    action: "add" | "remove" | "update",
    index: number,
    payload: string
  ) => {
    const newList = [...list];

    switch (action) {
      case "add":
        if (index !== 0 && index !== list.length) {
          newList.splice(index, 0, "");
        } else {
          newList.push("");
        }
        return newList;
      case "remove":
        newList.splice(index, 1);
        return newList;
      case "update":
        newList[index] = payload;
        return newList;
    }
  };

  return (
    <Stack direction={"column"} spacing={2}>
      {list.map((elem, i) => (
        <Stack key={i} direction={"row"} spacing={1}>
          <TextField
            fullWidth
            id="outlined-required"
            label={type === "ingredients" ? "Ingredient" : "Step"}
            value={elem}
            size="small"
            multiline={type === "preparation"}
            onChange={(event) => handleUpdate(event.target.value, i, "update")}
            error={invalidInput !== undefined && invalidInput !== "" && elem === ""}
            helperText={elem === "" ? invalidInput : ""}
          />
          <Box height={"auto"}>
            <IconButton
              onClick={() => handleUpdate("", i + 1, "add")}
              size="small"
            >
              <AddIcon />
            </IconButton>
          </Box>
          <Box>
            <IconButton
              onClick={() => handleUpdate("", i, "remove")}
              size="small"
            >
              <RemoveIcon />
            </IconButton>
          </Box>
        </Stack>
      ))}
      <Button
        onClick={() => handleUpdate("", list.length, "add")}
        startIcon={<AddIcon />}
        variant="contained"
        size="small"
        sx={{ backgroundColor: theme.palette.primary.light }}
      >
        Add {type === "ingredients" ? "Ingredient" : "Preparation Step"}
      </Button>
    </Stack>
  );
};

export default RecipeList;
