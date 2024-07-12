// React
import { FC, useEffect, useState } from "react";
// MUI
import {
  Autocomplete,
  Box,
  IconButton,
  Stack,
  TextField,
  styled,
  useTheme,
} from "@mui/material";
// Hooks
import { useNavigate } from "react-router-dom";
// Utils
import { RecipeMetadata } from "../../types/recipe";
// Types
import { ROUTE_RECIPE } from "../../routes";
// Icons
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { fetchRecipeMetadata } from "../../firebase/database";

const GroupHeader = styled("div")(({ theme }) => ({
  position: "sticky",
  top: "-8px",
  padding: "4px 10px",
  color: theme.palette.grey[600],
  backgroundColor: theme.palette.common.white
}));

const GroupItems = styled("ul")({
  padding: 0,
});

const SearchBar: FC<{
  setSearchMode: (b: any) => void;
}> = ({ setSearchMode }) => {
  const theme = useTheme();
  const [results, setResults] = useState<RecipeMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipeMetadata(setResults, setIsLoading);
  }, []);

  return (
    <>
      <Stack
        width="100%"
        sx={{
          pt: 1,
          position: "static",
          zIndex: 0,
          backgroundColor: theme.palette.primary.light,
        }}
      >
        <Stack
          mb={1}
          width={"100%"}
          direction="row"
          justifyContent={"space-between"}
        >
          <Box justifySelf={"center"} alignSelf={"center"} mx={2}>
            <SearchIcon sx={{ color: theme.palette.white.main }} />
          </Box>
          <Autocomplete
            freeSolo
            disableClearable
            id={"autocomplete-search"}
            sx={{ width: "100%", alignSelf: "center" }}
            groupBy={(option: any) => option.type}
            getOptionLabel={(option: any) => option.title}
            options={results}
            loading={isLoading}
            renderGroup={(params) => (
              <li key={params.key}>
                <GroupHeader>
                  {params.group[0].toUpperCase() + params.group.substring(1)}
                </GroupHeader>
                <GroupItems>{params.children}</GroupItems>
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                autoFocus
                fullWidth
                color={"secondary"}
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                  placeholder: "Search...",
                }}
                sx={{
                  input: {
                    color: theme.palette.white.main,
                  },
                }}
              />
            )}
            onChange={(event: any, recipe: any) => {
              setSearchMode(false);
              navigate(
                ROUTE_RECIPE(
                  recipe.type,
                  recipe.id,
                  recipe.categoryId !== undefined
                    ? recipe.categoryId
                    : undefined
                )
              );
            }}
          />

          <IconButton onClick={() => setSearchMode(false)}>
            <CloseIcon sx={{ color: theme.palette.white.main }} />
          </IconButton>
        </Stack>
      </Stack>
    </>
  );
};

export default SearchBar;
