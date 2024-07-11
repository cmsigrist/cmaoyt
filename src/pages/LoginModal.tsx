// React
import { FC, useContext, useEffect, useState } from "react";
// MUI
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Box,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// Hooks
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
// Components
// Utils
import { FlashContext } from "..";
import { auth, logInWithEmailAndPassword } from "../firebase/firebase";
import { ROUTE_HOME } from "../routes";
// Types
// Icons
import LoginIcon from "@mui/icons-material/Login";

const LoginModal: FC<{
  open: boolean;
  handleClose: () => void;
}> = ({ open, handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean | undefined>(
    undefined
  );
  const flashContext = useContext(FlashContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(ROUTE_HOME);
    }
  }, [user]);

  const handleLogin = () => {
    setIsLoggingIn(true);
    logInWithEmailAndPassword(email, password, flashContext, setIsLoggingIn);
    setTimeout(() => {
      handleClose();
      setIsLoggingIn(undefined);
    }, 1000);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle id="alert-dialog-title">{"Login"}</DialogTitle>
      <DialogContent>
        <Stack direction={"column"} spacing={2} marginY={2}>
          <Box>
            <TextField
              fullWidth
              required
              id="outlined-required"
              label="Email"
              size="small"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Box>
          <TextField
            fullWidth
            required
            id="outlined-required"
            label="Password"
            size="small"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <LoadingButton
          loading={isLoggingIn}
          loadingPosition="start"
          startIcon={<LoginIcon />}
          variant="contained"
          onClick={handleLogin}
          color={isLoggingIn === false ? "success" : undefined}
        >
          {isLoggingIn === undefined
            ? "Login"
            : isLoggingIn
            ? "Loging in..."
            : "Logged"}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default LoginModal;
