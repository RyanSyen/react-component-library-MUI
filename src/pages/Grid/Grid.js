/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
import * as React from "react";
import UseAnimations from "react-useanimations";
// import { github, twitter } from "react-useanimations/lib";
import github from "react-useanimations/lib/github";
import twitter from "react-useanimations/lib/twitter";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { experimentalStyled as styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ResponsiveGrid = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {/* {Array.from(Array(6)).map((_, index) => (
          <Grid xs={2} sm={4} md={4} key={index}>
            <Item>xs=2</Item>
          </Grid>
        ))} */}
        <Grid xs={2} sm={4} md={4}>
          <Item>
            <UseAnimations animation={github} size={56} />
          </Item>
        </Grid>
        <Grid xs={2} sm={4} md={4}>
          <Item>
            <UseAnimations animation={twitter} size={56} />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResponsiveGrid;
