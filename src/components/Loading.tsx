// React
import { FC } from "react";
// MUI
import { Stack, CircularProgress } from "@mui/material";
// Components
// Hooks
// Utils
// Types
// Icons

const Loading: FC<{ fullHeight?: boolean }> = ({ fullHeight }) => {
  return (
    <Stack
      width={"100%"}
      height={fullHeight ? "100%" : "75%"}
      justifyContent={"center"}
      alignItems={"center"}
      alignContent={"center"}
    >
      <CircularProgress />
    </Stack>
  );
};

export default Loading;
