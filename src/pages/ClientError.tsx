// React
import { FC, useState } from "react";
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
import { NavLink } from "react-router-dom";
// Utils
import { width } from "../styles/theme";
import { ROUTE_HOME } from "../routes";
import LoginModal from "./LoginModal";
// Types
// Icons

const ClientError: FC<{
  statusCode: number;
  title: string;
  description: string;
}> = ({ statusCode, title, description }) => {
  const theme = useTheme();
  const [openLogin, setOpenLogin] = useState(false);

  return (
    <>
      <LoginModal
        open={openLogin}
        handleClose={() => setOpenLogin(false)}
      />
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
              <Typography color={theme.palette.grey[700]}>
                {description}
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={2}>
              <NavLink to={ROUTE_HOME} style={{ textDecoration: "none" }}>
                <Button variant="contained">Go Home</Button>
              </NavLink>
              <Button variant="contained" onClick={() => setOpenLogin(true)}>
                Login
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </>
  );
};

export default ClientError;
