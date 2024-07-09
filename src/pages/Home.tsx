// React
import { FC } from "react";
// MUI
import { Stack } from "@mui/material";
// Components
// Hooks
// Utils
import logo from "../assets/logo.png";
// Types
// Icons

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
