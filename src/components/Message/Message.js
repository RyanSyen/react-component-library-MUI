import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";

const Message = props => {
  const navigate = useNavigate();
  const { title, message, action, actionPar, background } = props;
  const onClick = e => {
    if (actionPar.link) {
      navigate(actionPar.link);
    }

    if (actionPar.onClick) {
      actionPar.onClick(e);
    }
  };
  const renderBot = () => {
    let render;
    if (action === "link") {
      render = (
        <Typography
          style={{
            marginTop: "48px",
          }}
        >
          Did not receive an email from us?{" "}
          <Link
            to="/users/login"
            className="link"
            style={{ textDecoration: "none" }}
          >
            Resend Email.
          </Link>
        </Typography>
      );
    } else if (action === "email") {
      render = (
        <Typography
          style={{
            marginTop: "48px",
          }}
        >
          Did not receive an email from us?{" "}
          <Button
            className="link"
            variant="text"
            disableRipple
            disableFocusRipple
            disableTouchRipple
            size="large"
            type="submit"
            onClick={onClick}
            sx={{
              textTransform: "capitalize",
              backgroundColor: "transparent",
              paddingTop: "6px",
              paddingLeft: "0px",
              "&.MuiButtonBase-root:hover": {
                bgcolor: "transparent",
              },
            }}
          >
            Resend Email.
          </Button>
        </Typography>
      );
    } else if (action === "button") {
      render = (
        <Box>
          <Button
            className="XyanButton"
            variant="contained"
            color="primary"
            size="large"
            sx={{
              minHeight: "42px",
              marginTop: "20px",
            }}
            type="submit"
            onClick={onClick}
          >
            {actionPar.text}
          </Button>
        </Box>
      );
    } else {
      render = null;
    }
    return render;
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        minHeight: { xs: "50vh", md: "calc(100vh - 200px)" },
      }}
    >
      <Card
        variant="outlined"
        sx={{
          backgroundColor: "transparent",
          border: "none",
        }}
      >
        <CardMedia
          component="img"
          image={background}
          sx={{
            width: { xs: "150px", md: "200px" },
            display: "table",
            margin: "0 auto",
          }}
        />
        <CardContent
          style={{
            maxWidth: "640px",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <Typography
            gutterBottom
            component="div"
            sx={{
              fontSize: { xs: "20px", md: "24px" },
              fontWeight: "700",
              color: "rgba(0, 0, 0, 0.7)",
            }}
          >
            {title}
          </Typography>
          <Typography
            flexWrap
            component="div"
            sx={{
              fontSize: { xs: "16px", md: "16px" },
              wordWrap: "break-word",
              whiteSpace: "pre-wrap",
            }}
          >
            {message}
          </Typography>
          {renderBot()}
        </CardContent>
      </Card>
    </Box>
  );
};

Message.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
  action: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired,
  actionPar: PropTypes.shape(),
};

Message.defaultProps = {
  actionPar: null,
  message: null,
};

export default Message;
