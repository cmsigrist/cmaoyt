// React
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// MUI
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  InputBase,
  Popover,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { alpha, styled, useTheme } from "@mui/material/styles";
// Components
import LoginModal from "../pages/LoginModal";
// Hooks
// Utils
import {
  ROUTE_DESSERTS,
  ROUTE_DRINKS,
  ROUTE_HOME,
  ROUTE_MEALS,
  ROUTE_RECIPE_NEW,
} from "../routes";
import { stringAvatar } from "../util/avatar";
import { DBUserContext, FlashContext } from "..";
import { logout } from "../firebase/firebase";
// Types
// Icons
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import MobilePopover from "./ResponsiveAppBar/MobilePopover";
import SearchBar from "./ResponsiveAppBar/SearchBar";

function ResponsiveAppBar() {
  const theme = useTheme();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [searchMode, setSearchMode] = useState(false);

  const DBUser = useContext(DBUserContext);
  const flashContext = useContext(FlashContext);
  const [openLogin, setOpenLogin] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    DBUser.isLogged = false;
    DBUser.name = "";
    DBUser.role = "";

    logout(flashContext);
    navigate(ROUTE_HOME);
  };

  const handleNavigateTo = () => {
    handleCloseNavMenu();
    setSearchMode(false);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <LoginModal open={openLogin} handleClose={() => setOpenLogin(false)} />
      <AppBar
        position="static"
        sx={{ backgroundColor: theme.palette.primary.main }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <NavLink
              to={ROUTE_HOME}
              style={{ textDecoration: "none" }}
              onClick={() => setSearchMode(false)}
            >
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: theme.palette.secondary.main,
                  textDecoration: "none",
                }}
              >
                CMAOYT
              </Typography>
            </NavLink>

            <Box
              sx={{
                flexGrow: 1,
                witdh: "100%",
                display: { xs: "flex", md: "none" },
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <MobilePopover
                anchorElNav={anchorElNav}
                handleCloseNavMenu={handleCloseNavMenu}
                handleLogout={handleLogout}
                setOpenLogin={setOpenLogin}
                setSearchMode={setSearchMode}
              />
            </Box>
            <NavLink
              to={ROUTE_HOME}
              style={{ textDecoration: "none" }}
              onClick={() => setSearchMode(false)}
            >
              <Typography
                variant="h5"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: theme.palette.secondary.main,
                }}
              >
                CMAOYT
              </Typography>
            </NavLink>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
              }}
            >
              <NavLink to={ROUTE_DESSERTS}>
                <Button
                  key="desserts"
                  color="white"
                  onClick={handleNavigateTo}
                >
                  Desserts
                </Button>
              </NavLink>
              <NavLink to={ROUTE_MEALS}>
                <Button key="meals" color="white" onClick={handleNavigateTo}>
                  Meals
                </Button>
              </NavLink>
              <NavLink to={ROUTE_DRINKS}>
                <Button key="drinks" color="white" onClick={handleNavigateTo}>
                  Drinks
                </Button>
              </NavLink>
            </Box>
            {DBUser.isLogged && (
              <Stack
                direction={"row"}
                spacing={2}
                sx={{
                  alignItems: "center",
                  display: { xs: "none", md: "flex" },
                }}
              >
                <IconButton onClick={() => setSearchMode(!searchMode)}>
                  <SearchIcon sx={{ color: theme.palette.white.main }} />
                </IconButton>
                <NavLink
                  to={ROUTE_RECIPE_NEW}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    key={"create"}
                    variant="outlined"
                    onClick={handleNavigateTo}
                    color="white"
                    sx={{
                      my: 2,
                      display: "block",
                      marginRight: 2,
                    }}
                  >
                    Create
                  </Button>
                </NavLink>
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt={DBUser.name}
                        {...stringAvatar(DBUser.name)}
                      />
                    </IconButton>
                  </Tooltip>
                  <Popover
                    open={anchorElUser !== null}
                    anchorEl={anchorElUser}
                    onClose={handleCloseUserMenu}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    slotProps={{
                      paper: {
                        sx: {
                          width: 200,
                          mt: 1.5,
                        },
                      },
                    }}
                  >
                    <Stack
                      direction={"column"}
                      sx={{ paddingY: 2, paddingX: 2 }}
                      spacing={2}
                      justifyContent={"center"}
                    >
                      <Typography>Logged as {DBUser.name}</Typography>
                      <Button
                        variant="contained"
                        fullWidth
                        startIcon={<LogoutIcon />}
                        onClick={() => {
                          handleLogout();
                          handleCloseUserMenu();
                        }}
                      >
                        Logout
                      </Button>
                    </Stack>
                  </Popover>
                </Box>
              </Stack>
            )}
            {!DBUser.isLogged && (
              <Box
                sx={{
                  alignItems: "center",
                  display: { xs: "none", md: "flex" },
                }}
              >
                <Button
                  key={"login"}
                  variant="outlined"
                  startIcon={<LoginIcon />}
                  onClick={() => setOpenLogin(true)}
                  color="white"
                  sx={{
                    my: 2,
                    marginRight: 2,
                  }}
                >
                  Login
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      {searchMode && (
        <SearchBar setSearchMode={setSearchMode} />
      )}
    </>
  );
}
export default ResponsiveAppBar;
