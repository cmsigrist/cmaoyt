import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Button,
  useTheme,
  TextField,
  Box,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";

type RecipeCategoryProps = {
  category: string | undefined;
  handleUpdate: (category: string | undefined) => void;
};

const RecipeCategory: FC<RecipeCategoryProps> = ({
  category,
  handleUpdate,
}) => {
  const theme = useTheme();
  const [categories, setCategories] = useState<string[]>([
    "None",
    "Cookies",
    "Waffles",
  ]);
  const [newCategory, setNewCategory] = useState<string | undefined>(undefined);
  const [error, setError] = useState(false);
  const [show, setShow] = useState<boolean>();

  useEffect(() => {
    // fetch categories
    setCategories(["None", "Cookies", "Waffles"]);
    setShow(category !== undefined)
  }, [category]);

  const handleNewCategory = (c: string | undefined) => {
    // upload to metadata
    if (c !== undefined && c !== "") {
      categories.push(c);
      handleUpdate(c);
      setNewCategory(undefined);
    }
    if (c === "") {
      setError(true);
    }
  };

  return (
    <Stack spacing={2}>
      {!show && (
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          size="small"
          sx={{
            width: "100%",
            backgroundColor: theme.palette.primary.light,
          }}
          onClick={() => setShow(true)}
        >
          Add Category
        </Button>
      )}
      {show && (
        <>
          <Stack direction="row" spacing={1} justifyContent={"space-between"}>
            <FormControl sx={{ flexGrow: 1 }}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category === undefined ? "None" : category}
                label="Category"
                size="small"
                onChange={(event) => handleUpdate(event.target.value)}
              >
                {categories.map((c, i) => (
                  <MenuItem key={i} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box>
              <Button
                onClick={() => {
                  handleUpdate(undefined);
                  setShow(false);
                }}
              >
                Remove Category
              </Button>
            </Box>
          </Stack>
          {newCategory === undefined && (
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              size="small"
              sx={{
                width: "100%",
                backgroundColor: theme.palette.primary.light,
              }}
              onClick={() => setNewCategory("")}
            >
              Create New Category
            </Button>
          )}
          {newCategory !== undefined && (
            <Stack direction="row" spacing={1} justifyContent={"space-between"}>
              <TextField
                sx={{ flex: 1 }}
                id="outlined-required"
                label="Category"
                value={newCategory}
                size="small"
                error={error}
                helperText={error ? "Category cannot be empty." : ""}
                onChange={(event) => {
                  setError(false);
                  setNewCategory(event.target.value);
                }}
              />
              <Box>
                <Button
                  onClick={() => {
                    handleNewCategory(newCategory);
                    handleUpdate(newCategory);
                  }}
                >
                  Create
                </Button>
                <Button onClick={() => setNewCategory(undefined)}>
                  Cancel
                </Button>
              </Box>
            </Stack>
          )}
        </>
      )}
    </Stack>
  );
};

export default RecipeCategory;
