import { Alert, Box, IconButton, Slide } from "@mui/material";
import { FC, useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { FlashContext } from "..";

const Flash: FC = () => {
  const flashContext = useContext(FlashContext);

  return (
    <Box position={"absolute"} width={"100%"} zIndex={1000}>
      {flashContext !== undefined &&
        flashContext.getMessages().map((message, i) => (
          <Slide key={i} direction="left" in={true} mountOnEnter unmountOnExit>
            <Alert
              sx={{ position: "relative" }}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => flashContext.hideMessage(message.id)}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              severity={message.severity}
            >
              {message.text}
            </Alert>
          </Slide>
        ))}
    </Box>
  );
};

export default Flash;
