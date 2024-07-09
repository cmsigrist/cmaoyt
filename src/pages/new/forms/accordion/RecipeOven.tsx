// React
import { FC, useEffect, useState } from "react";
// MUI
import { Box, Button, Stack, TextField, useTheme } from "@mui/material";
// Components
// Hooks
// Utils
// Types
// Icons
import AddIcon from "@mui/icons-material/Add";

type RecipeOvenProps = {
  temperature: number | undefined;
  handleUpdate: (temp: number | undefined) => void;
};

const RecipeOven: FC<RecipeOvenProps> = ({ temperature, handleUpdate }) => {
  const theme = useTheme();
  const [show, setShow] = useState<boolean>();

  useEffect(() => {
    setShow(temperature !== undefined);
  }, [temperature]);

  return (
    <Stack>
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
          Add Oven Temperature
        </Button>
      )}
      {show && (
        <Stack direction="row" spacing={1}>
          <TextField
            id="outlined-required"
            value={temperature === undefined ? "" : temperature}
            size="small"
            label="°C"
            onChange={(event) =>
              handleUpdate(Number.parseInt(event.target.value))
            }
          />
          <Box>
            <Button
              onClick={() => {
                handleUpdate(undefined);
                setShow(false);
              }}
            >
              Remove Oven Temperature
            </Button>
          </Box>
        </Stack>
      )}
    </Stack>
  );
};

export default RecipeOven;
