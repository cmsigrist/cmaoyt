// React
import { FC } from "react";
// MUI
import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
// Components
// Hooks
// Utils
import { width } from "../styles/theme";
// Types
// Icons

const ClientError: FC<{
  statusCode: number;
  title: string;
  description: string;
}> = ({ statusCode, title, description }) => {
  const theme = useTheme();

  return (
    <Stack
      width={width}
      direction={"row"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack direction={"row"} spacing={2}>
        <Typography
          variant="h3"
          fontWeight={"bold"}
          color={theme.palette.primary.light}
        >
          {statusCode}
        </Typography>
        <Divider orientation="vertical" sx={{ height: 75 }} />

        <Box>
          <Stack direction={"column"} marginBottom={5}>
            <Typography variant="h3" fontWeight={"bold"}>
              {title}
            </Typography>
            <Typography color={theme.palette.grey[700]}>{description}</Typography>
          </Stack>
          <Stack direction={"row"} spacing={2}>
            <Button variant="contained">Go Home</Button>
            <Button variant="contained">Login</Button>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
};

export default ClientError;
