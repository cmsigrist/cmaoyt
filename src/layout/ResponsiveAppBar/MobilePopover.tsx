// React
import { FC, useContext } from "react";
// MUI
import { Popover, Stack, Button, Typography, IconButton } from "@mui/material";
// Components
// Utils
import { NavLink } from "react-router-dom";
import {
  ROUTE_DESSERTS,
  ROUTE_MEALS,
  ROUTE_DRINKS,
  ROUTE_RECIPE_NEW,
} from "../../routes";
import { DBUserContext } from "../..";
// Icons
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

type MobilePopoverProps = {
  anchorElNav: HTMLElement | null;
  handleCloseNavMenu: () => void;
  handleLogout: () => void;
  setOpenLogin: (open: boolean) => void;
  setSearchMode: (s: boolean) => void;
};

const MobilePopover: FC<MobilePopoverProps> = ({
  anchorElNav,
  handleCloseNavMenu,
  handleLogout,
  setOpenLogin,
  setSearchMode,
}) => {
  const DBUser = useContext(DBUserContext);

  const handleNavigateTo = () => {
    handleCloseNavMenu();
    setSearchMode(false);
  };

  return (
    <Popover
      open={anchorElNav !== null}
      anchorEl={anchorElNav}
      onClose={handleCloseNavMenu}
      slotProps={{
        paper: {
          sx: {
            width: "100%",
          },
        },
      }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Stack
        direction="column"
        sx={{ paddingY: 2, paddingX: 2 }}
        spacing={1}
        justifyContent={"center"}
      >
        <Stack direction={"row"} justifyContent="space-between">
          <IconButton onClick={handleCloseNavMenu}>
            <CloseIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setSearchMode(true);
              handleCloseNavMenu();
            }}
          >
            <SearchIcon />
          </IconButton>
        </Stack>
        <NavLink to={ROUTE_DESSERTS}>
          <Button key="desserts" onClick={handleNavigateTo}>
            Desserts
          </Button>
        </NavLink>
        <NavLink to={ROUTE_MEALS}>
          <Button key="meals" onClick={handleNavigateTo}>
            Meals
          </Button>
        </NavLink>
        <NavLink to={ROUTE_DRINKS}>
          <Button key="drinks" onClick={handleNavigateTo}>
            Drinks
          </Button>
        </NavLink>
        <NavLink to={ROUTE_RECIPE_NEW} style={{ textDecoration: "none" }}>
          <Button
            key={"create"}
            variant="contained"
            fullWidth
            onClick={handleNavigateTo}
          >
            Create
          </Button>
        </NavLink>
      </Stack>
      <Stack sx={{ paddingY: 2, paddingX: 2 }} spacing={2}>
        {DBUser.isLogged && (
          <>
            <Typography textAlign="center">Logged as {DBUser.name}</Typography>
            <Button
              variant="contained"
              fullWidth
              startIcon={<LogoutIcon />}
              onClick={() => {
                handleLogout();
                handleCloseNavMenu();
              }}
            >
              Logout
            </Button>
          </>
        )}
        {!DBUser.isLogged && (
          <Button
            variant="contained"
            fullWidth
            startIcon={<LoginIcon />}
            onClick={() => {
              setOpenLogin(true);
              handleCloseNavMenu();
            }}
          >
            Login
          </Button>
        )}
      </Stack>
    </Popover>
  );
};

export default MobilePopover;
