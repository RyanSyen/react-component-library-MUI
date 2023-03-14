/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { animated, useSpring } from "react-spring";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";

import emptyRowPage from "../../assets/empty-row-add.png";
import CardUsers from "../../components/CardUsers";
import Message from "../../components/Message";
import Popup from "../../components/Popup";
import Sidebar from "../../components/Sidebar";
import Snackbar from "../../components/Snackbar";
import usePopup from "../../hooks/usePopup";
import useSidebar from "../../hooks/useSidebar";
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
  const popup = usePopup();
  const sidebar = useSidebar();

  const [isFadeInUserAnimation, setIsFadeInUserAnimation] = useState("true");

  const [list, setList] = useState(userList);

  useEffect(() => {
    // setIsFadeInUserAnimation(false);
    // console.log("rendered");
    console.log(isFadeInUserAnimation);
  }, [isFadeInUserAnimation]);

  const actions = (() => {
    const openSnackbar = (msg = "success", isError = false) => {
      snackbar.open(msg, isError);
    };
    const openPopup = () => {
      popup.open(
        // title, targetPopup, targetCancel
        "Asset Library",
        {
          text: "Add New",
          onClick: () => {
            // navigate();
            console.log("add new folder");
            // openSnackbar("popup called", false);
          },
        },
        {
          onClick: () => {
            popup.close();
          },
        },
      );
    };
    const openSidebar = e => {
      sidebar.open(e);
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
    const defaultAction = () => {
      return false;
    };

    return {
      openPopup,
      openSidebar,
      openSnackbar,
      addUser,
      defaultAction,
    };
  })();

  const popupContent = (
    <Typography
      variant="h5"
      component="div"
      gutterBottom
      sx={{ fontSize: "24px", lineHeight: "160p%" }}
    >
      Popup
    </Typography>
  );

  const sidebarContent = (
    <>
      <Typography
        variant="h5"
        component="div"
        gutterBottom
        sx={{ fontSize: "24px", lineHeight: "160p%" }}
      >
        Update Password
      </Typography>
      <Box
        style={{
          marginTop: "50px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Stack spacing={5} direction="row">
          <Button
            className="XyanButton"
            variant="text"
            size="large"
            onClick={sidebar.close}
          >
            CANCEL
          </Button>
          <Button
            className="XyanButton"
            variant="contained"
            size="large"
            onClick={null}
            style={{
              borderRadius: "100px",
            }}
          >
            SAVE
          </Button>
        </Stack>
      </Box>
    </>
  );

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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "15px",
          borderRadius: "15px",
          background: "#fff",
          border: "1px solid #fff",
          boxShadow:
            "rgba(140, 177, 189, 0.15) -10px -10px 15px, rgba(140, 177, 189, 0.15) 10px 10px 15px",
          boxSizing: "border-box",
          marginBottom: "24px",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Features</h1>
        <ul style={{ margin: "0" }}>
          <li>
            <p>display snackbar</p>
          </li>
          <li>
            <p>display and add new user + animation</p>
          </li>
          <li>display sidebar</li>
        </ul>
      </div>
      <Button
        className="XyanButton"
        onClick={actions.openPopup}
        sx={{
          fontSize: "14px",
          fontWeight: 600,
          letterSpacing: "0.46px",
        }}
      >
        Show Popup
      </Button>
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
        onClick={actions.openSidebar}
        sx={{
          fontSize: "14px",
          fontWeight: 600,
          letterSpacing: "0.46px",
        }}
      >
        Show Sidebar
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
      <Box>
        {(() => {
          if (!list) {
            return null;
          }

          if (list.length === 0) {
            return (
              <Box
                sx={{
                  // width: "1200px",
                  margin: "auto",
                  // mx: "auto",
                  // maxWidth: 1200,
                }}
              >
                <Message
                  title="No Item added yet"
                  message="Would you like to add one?"
                  action="button"
                  actionPar={{
                    onClick: actions.onCreate,
                    text: "Add New Item",
                  }}
                  background={emptyRowPage}
                />
              </Box>
            );
          }

          return (
            <Box
              sx={{
                mx: "auto",
                maxWidth: 1200,
                mt: 5,
                boxSizing: "border-box",
                // border: "1px solid #FFFFFF",
                // background: "rgba(255, 255, 255, 0.6)",
                borderRadius: "20px",
              }}
            >
              <animated.div
                style={isFadeInUserAnimation === "true" ? props : null}
              >
                <Grid container spacing={{ xs: 2, md: 3 }}>
                  {list.map((el, i) => {
                    return (
                      // eslint-disable-next-line react/no-array-index-key
                      <Grid item xs={12} lg={4} key={i}>
                        <CardUsers
                          transIn
                          transInTime={i}
                          info={el}
                          key={el.id}
                          actionEdit={actions.defaultAction}
                          actionDelete={actions.defaultAction}
                          actionActivate={actions.defaultAction}
                          actionDeactivate={actions.defaultAction}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </animated.div>
            </Box>
          );
        })()}
      </Box>
      <Popup {...popup}>{popupContent}</Popup>
      <Sidebar {...sidebar}>{sidebarContent}</Sidebar>
      <Snackbar {...snackbar} />
    </>
  );
};

export default Playground;
