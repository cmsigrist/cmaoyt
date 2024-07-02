import { Box, Button, Stack, TextField, useTheme } from "@mui/material";
import { FC, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { QuoteType } from "../../../types/recipe";

type RecipeQuoteProps = {
  quote: QuoteType | undefined;
  type: "quote" | "source";
  handleUpdate: (quote: QuoteType | undefined) => void;
};

const RecipeQuote: FC<RecipeQuoteProps> = ({
  quote,
  type,
  handleUpdate,
}) => {
  const theme = useTheme();
  const [show, setShow] = useState<boolean>();

  useEffect(() => {
    setShow(quote !== undefined)
  }, [quote])

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
          Add {type === "quote" ? "Quote" : "Source"}
        </Button>
      )}
      {show && (
        <Stack direction="column" spacing={2}>
          <TextField
            multiline
            id="outlined-required"
            value={quote?.content !== undefined ? quote.content : ""}
            size="small"
            label={type === "quote" ? "Quote" : "Source"}
            onChange={(event) =>
              handleUpdate({ content: event.target.value, author: quote?.author || ""})
            }
          />
          <TextField
            id="outlined-required"
            value={quote?.author !== undefined ? quote.author : ""}
            size="small"
            label="Author"
            onChange={(event) =>
              handleUpdate({ content: quote?.content || "", author: event.target.value })
            }
          />
          <Box>
            <Button
              onClick={() => {
                handleUpdate(undefined);
                setShow(false);
              }}
            >
              Remove {type === "quote" ? "Quote" : "Source"}
            </Button>
          </Box>
        </Stack>
      )}
    </Stack>
  );
};

export default RecipeQuote;
