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

function ResponsiveAppBar() {
  const theme = useTheme();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
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

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

  return (
    <>
      <LoginModal
        open={openLogin}
        handleClose={() => setOpenLogin(false)}
      />
      <AppBar
        position="static"
        sx={{ backgroundColor: theme.palette.primary.main }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <NavLink to={ROUTE_HOME} style={{ textDecoration: "none" }}>
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
                  <NavLink to={ROUTE_DESSERTS}>
                    <Button key="desserts" onClick={handleCloseNavMenu}>
                      Desserts
                    </Button>
                  </NavLink>
                  <NavLink to={ROUTE_MEALS}>
                    <Button key="meals" onClick={handleCloseNavMenu}>
                      Meals
                    </Button>
                  </NavLink>
                  <NavLink to={ROUTE_DRINKS}>
                    <Button key="drinks" onClick={handleCloseNavMenu}>
                      Drinks
                    </Button>
                  </NavLink>
                  <NavLink
                    to={ROUTE_RECIPE_NEW}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      key={"create"}
                      variant="contained"
                      fullWidth
                      onClick={handleCloseNavMenu}
                    >
                      Create
                    </Button>
                  </NavLink>
                </Stack>
                <Stack sx={{ paddingY: 2, paddingX: 2 }} spacing={2}>
                  {DBUser.isLogged && (
                    <>
                      <Typography textAlign="center">
                        Logged as {DBUser.name}
                      </Typography>
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
            </Box>
            <NavLink to={ROUTE_HOME} style={{ textDecoration: "none" }}>
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
                  onClick={handleCloseNavMenu}
                >
                  Desserts
                </Button>
              </NavLink>
              <NavLink to={ROUTE_MEALS}>
                <Button key="meals" color="white" onClick={handleCloseNavMenu}>
                  Meals
                </Button>
              </NavLink>
              <NavLink to={ROUTE_DRINKS}>
                <Button key="drinks" color="white" onClick={handleCloseNavMenu}>
                  Drinks
                </Button>
              </NavLink>
            </Box>
            {DBUser.isLogged && (
              <Box
                sx={{
                  alignItems: "center",
                  display: { xs: "none", md: "flex" },
                }}
              >
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>
                <NavLink
                  to={ROUTE_RECIPE_NEW}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    key={"create"}
                    variant="outlined"
                    onClick={handleCloseNavMenu}
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
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    slotProps={{
                      paper: {
                        sx: {
                          width: 200,
                          mt:1.5
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
              </Box>
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
                  onClick={() => setOpenLogin(true)}
                  color="white"
                  sx={{
                    my: 2,
                    display: "block",
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
    </>
  );
}
export default ResponsiveAppBar;
