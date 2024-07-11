// React
import { Suspense, useContext } from "react";
// MUI
import { Container, Stack } from "@mui/material";
// Components
import ResponsiveAppBar from "./ResponsiveAppBar";
import Home from "../pages/Home";
import Desserts from "../pages/Desserts";
import Meals from "../pages/Meals";
import Drinks from "../pages/Drinks";
import Footer from "./Footer";
import Category from "../pages/Category";
import Recipe from "../pages/Recipe";
import RecipeNew from "../pages/RecipeNew";
import RecipeEdit from "../pages/RecipeEdit";
import ClientError from "../pages/ClientError";
import Flash from "../components/Flash";
// Hooks
// Utils
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import {
  ROUTE_DESSERTS,
  ROUTE_DRINKS,
  ROUTE_FORBIDDEN,
  ROUTE_HOME,
  ROUTE_LOGGED,
  ROUTE_MEALS,
  ROUTE_RECIPE_NEW,
} from "../routes";
import { DBUserContext } from "..";
// Types
// Icons

function App() {
  const DBUser = useContext(DBUserContext);

  const RequireAuth = ({
    children,
  }: {
    children: JSX.Element;
    roles?: string[];
  }): JSX.Element => {
    let location = useLocation();

    if (!DBUser.isLogged || DBUser.role !== "admin") {
      return (
        <Navigate to={ROUTE_FORBIDDEN} state={{ from: location }} replace />
      );
    }

    return children;
  };

  return (
    <Suspense fallback="...loading app">
      <Router>
        <Stack minHeight={"100vh"} direction={"column"}>
          <ResponsiveAppBar />
          <Flash />
          <Container
            maxWidth="xl"
            sx={{
              display: "flex",
              justifyContent: "center",
              flexGrow: 1,
              height: "100%",
            }}
          >
            <Routes>
              {/* <Route path={ROUTE_LOGGED} element={<Logged />} /> */}
              {/* <Route path={ROUTE_SETTINGS} element={<Settings />} /> */}
              <Route path={ROUTE_HOME} element={<Home />} />
              <Route
                path={ROUTE_DESSERTS}
                element={
                  <RequireAuth>
                    <Desserts />
                  </RequireAuth>
                }
              />
              <Route
                path={ROUTE_MEALS}
                element={
                  <RequireAuth>
                    <Meals />
                  </RequireAuth>
                }
              />
              <Route
                path={ROUTE_DRINKS}
                element={
                  <RequireAuth>
                    <Drinks />
                  </RequireAuth>
                }
              />
              <Route
                path={ROUTE_RECIPE_NEW}
                element={
                  <RequireAuth>
                    <RecipeNew />
                  </RequireAuth>
                }
              />
              <Route
                path={"/:type/category/:categoryId"}
                element={
                  <RequireAuth>
                    <Category />
                  </RequireAuth>
                }
              />
              <Route
                path={"/:type/:recipeId"}
                element={
                  <RequireAuth>
                    <Recipe />
                  </RequireAuth>
                }
              />
              <Route
                path={"/:type/category/:categoryId/:recipeId"}
                element={
                  <RequireAuth>
                    <Recipe />
                  </RequireAuth>
                }
              />
              <Route
                path={"/edit/:type/category/:categoryId/:recipeId"}
                element={
                  <RequireAuth>
                    <RecipeEdit />
                  </RequireAuth>
                }
              />
              <Route
                path={"/edit/:type/:recipeId"}
                element={
                  <RequireAuth>
                    <RecipeEdit />
                  </RequireAuth>
                }
              />
              <Route
                path="*"
                element={
                  <ClientError
                    statusCode={404}
                    description={"The page you are looking for does not exist."}
                    title={"Page not found"}
                  />
                }
              />
              <Route
                path={ROUTE_FORBIDDEN}
                element={
                  <ClientError
                    statusCode={403}
                    title={"Forbidden page"}
                    description={"You are not authorized to access this page."}
                  />
                }
              />
              {/* <Route
                path={ROUTE_REGISTER}
                element={
                  <RequireAuth>
                    <Register />
                  </RequireAuth>
                }
              />
              <Route
                path={ROUTE_PASSWORD_RESET}
                element={
                  <RequireAuth>
                    <Reset />
                  </RequireAuth>
                }
              /> */}
            </Routes>
          </Container>
          <Footer />
        </Stack>
      </Router>
    </Suspense>
  );
}

export default App;
