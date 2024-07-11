// React
import React, { ReactElement, createContext, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
// MUI
import { ThemeProvider } from '@mui/material';
// Components
import App from './layout/App';
import Loading from './components/Loading';
// Hooks
import { useAuthState } from 'react-firebase-hooks/auth';
// Utils
import './index.css';
import reportWebVitals from './reportWebVitals';
import { theme } from './styles/theme';
import { auth } from './firebase/firebase';
// Types
import { DBUser } from './types/user';
import { FlashMessage, FlashSeverity, FlashState, flashTimeout } from './types/flash';
import { getDBUser } from './firebase/firestore';
// Icons

const defaultDBUser: DBUser = { isLogged: false, name: '', role: '' };

export const DBUserContext = createContext<DBUser>(defaultDBUser);

export const FlashContext = createContext<FlashState | undefined>(undefined);

const AppContainer = () => {
  const [content, setContent] = useState<ReactElement>(<Loading fullHeight />);
  const [user] = useAuthState(auth); // from firebase
  const [dbUser, setDBUSer] = useState<DBUser>(defaultDBUser);
  const [flashes, setFlashes] = useState<FlashMessage[]>([]);

  const flashesRef = useRef(flashes);
  flashesRef.current = flashes;

  // flashState implements FlashStates. It wraps the necessary functions to be
  // passed to the FlashContext.
  const flashState = {
    getMessages: (): FlashMessage[] => {
      return flashes;
    },

    // add a flash to the list and set a timeout on it
    addMessage: (message: string, severity: FlashSeverity) => {
      const flash = new FlashMessage(message, severity);
      const newFlashes = [...flashes, flash];
      setFlashes(newFlashes);

      // remove the flash after some timeout
      setTimeout(() => {
        let removedFlashes = [...flashesRef.current];
        removedFlashes = removedFlashes.filter((f) => f.id !== flash.id);
        setFlashes(removedFlashes);
      }, flashTimeout);
    },

    // Set the visibility of flashMessage to false
    hideMessage: (id: string) => {
      let removedFlashes = [...flashesRef.current];
      removedFlashes = removedFlashes.filter((f) => f.id !== id);
      setFlashes(removedFlashes);
    }
  };

  useEffect(() => {
    if (user) {
      getDBUser(user.uid, flashState).then((newDBUser) => {
        if (newDBUser !== undefined) {
          setDBUSer(newDBUser);
          setContent(<App />);
        }
      });
    } else {
      setContent(<App />);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <FlashContext.Provider value={flashState}>
      <DBUserContext.Provider value={dbUser}>{content}</DBUserContext.Provider>
    </FlashContext.Provider>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AppContainer />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
