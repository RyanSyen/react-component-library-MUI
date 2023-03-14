/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { animated, useSpring } from "react-spring";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";

import Snackbar from "../../components/Snackbar";
import useSnackbar from "../../hooks/useSnackbar";

import "./Placeholder.styles.css";

const userList = [
  {
    email: "email@example.com",
    displayName: "Test User",
  },
  {
    email: "email2@example.com",
    displayName: "Test User 2",
  },
];

const Playground = () => {
  const snackbar = useSnackbar();

  const [isFadeInUserAnimation, setIsFadeInUserAnimation] = useState("true");

  const [list, setList] = useState(userList);

  useEffect(() => {
    // setIsFadeInUserAnimation(false);
    // console.log("rendered");
    console.log(isFadeInUserAnimation);
  }, [isFadeInUserAnimation]);

  const actions = (() => {
    const openSnackbar = () => {
      snackbar.open("Error", true);
    };
    const addUser = () => {
      const newUser = {
        email: "ryan@gmail.com",
        displayName: "Ryan",
      };

      userList.push(newUser);
      setList(userList);

      setIsFadeInUserAnimation("true");
      console.log(isFadeInUserAnimation);
    };

    return {
      openSnackbar,
      addUser,
    };
  })();

  // react-spring animation configuration
  // may not work during re-renders because the component state or prop have not changed
  // when the state value changes, the 'useSpring' hook updates animation style obj
  // which triggers a new render with the updated animation values
  const props = useSpring({
    to: {
      opacity: isFadeInUserAnimation === "true" ? 1 : 0,
      // opacity: 1,
      // > update animation values
      transform:
        isFadeInUserAnimation === "true"
          ? "translateY(0px)"
          : "translateY(50px)",
    },
    // to: { opacity: 1, transform: "translateY(0px)" },
    // from: { opacity: 0, transform: "translateY(50px)" },
    from: {
      opacity: isFadeInUserAnimation === "true" ? 0 : 1,
      // opacity: 1,
      // > update animation values
      transform:
        isFadeInUserAnimation === "true"
          ? "translateY(50px)"
          : "translateY(0px)",
    },
    config: {
      tension: 100,
      friction: 20,
      // duration: isFadeInUserAnimation === "true" ? 500 : 1,
      duration: 500,
    },
    // delay: 2500,
    // > reset animation
    onRest: () => {
      console.log("props animation finished");
      setIsFadeInUserAnimation("false");
    },
  });

  return (
    <>
      <Button
        className="XyanButton"
        onClick={actions.openSnackbar}
        sx={{
          fontSize: "14px",
          fontWeight: 600,
          letterSpacing: "0.46px",
        }}
      >
        Show Snackbar
      </Button>
      <Button
        className="XyanButton"
        onClick={actions.addUser}
        sx={{
          fontSize: "14px",
          fontWeight: 600,
          letterSpacing: "0.46px",
        }}
      >
        Add
      </Button>

      <Snackbar {...snackbar} />
    </>
  );
};

export default Playground;
