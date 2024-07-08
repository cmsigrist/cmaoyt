import { FC, useState } from "react";
import logo from "../assets/logo.png";
import { Box, Button, Stack, Typography } from "@mui/material";
import { RecipeInfo } from "../types/recipe";

const Home: FC = () => {
  return (
    <Stack justifyContent={"center"} alignItems={"center"}>
      <img
        alt="CMAOYT logo"
        src={logo}
        style={{
          maxWidth: "100%",
          height: "auto",
          maxHeight: "83vh",
          alignSelf: "center",
        }}
      />
    </Stack>
  );
};

export default Home;
