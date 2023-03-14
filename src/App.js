import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import unauthenticatedRoute from "./config/unauthRoute";
import createMuiTheme from "./createMuiTheme";

import "./App.css";

const theme = createMuiTheme();

const UnauthenticatedApp = () => {
  return (
    <Routes>
      {unauthenticatedRoute.map(route => {
        return (
          <Route key={route.id} path={route.path} element={route.element} />
        );
      })}
      <Route path="*" element={<Navigate to="/placeholder" />} />
      <Route path="/default-sortable" element={<Navigate to="/sortable" />} />
      <Route path="/treeview" element={<Navigate to="/treeview" />} />
    </Routes>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <UnauthenticatedApp />
    </ThemeProvider>
    // <div className="App">
    //   <div>
    //     <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
    //       <img src="/vite.svg" className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://reactjs.org" target="_blank" rel="noreferrer">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button type="button" onClick={() => setCount(count => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.jsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </div>
  );
};

export default App;
