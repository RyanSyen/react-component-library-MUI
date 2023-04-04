import React, { lazy, Suspense } from "react";
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
      <Route
        path="/paginationview"
        element={<Navigate to="/paginationview" />}
      />
      <Route path="/feedbackview" element={<Navigate to="/feedbackview" />} />
      <Route path="/navbarview" element={<Navigate to="/navbarview" />} />
      <Route
        path="/refactored-tree-view"
        element={<Navigate to="/refactored-tree-view" />}
      />
      <Route path="/treeviewR3" element={<Navigate to="/treeviewR3" />} />
      <Route path="/notification" element={<Navigate to="/notification" />} />
    </Routes>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <UnauthenticatedApp />
    </ThemeProvider>
  );
};

export default App;
