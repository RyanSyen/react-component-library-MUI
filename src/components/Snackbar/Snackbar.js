/* eslint-disable indent */
/* eslint-disable import/no-extraneous-dependencies */
import { forwardRef } from "react";
import MuiAlert from "@mui/material/Alert";
import MuiSnackbar from "@mui/material/Snackbar";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

const CustomizedSnackbar = styled(props => <MuiSnackbar {...props} />)(
  props => ({
    "& .MuiPaper-root": {
      border: "none",
      borderRadius: "50px",
      color:
        props.type === "success"
          ? "#2C965D"
          : props.type === "error"
          ? "#E24747"
          : "#B59410",
      background:
        props.type === "success"
          ? "#CDF7E0"
          : props.type === "error"
          ? "#FFD4D3"
          : "#FDFD96",
      // color: props.type === "success" ? "#2C965D" : "#E24747",
      // background: props.type === "success" ? "#CDF7E0" : "#FFD4D3",
    },
    "& .MuiAlert-icon": {
      color:
        props.type === "success"
          ? "#2C965D"
          : props.type === "error"
          ? "#E24747"
          : "#B59410",
    },
  }),
);

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Snackbar = ({ message, isOpen, type, onClose }) => {
  return (
    <CustomizedSnackbar
      open={isOpen}
      autoHideDuration={2500}
      transitionDuration={{ enter: 1000, exit: 500 }}
      onClose={onClose}
      // style={{ width: "100%", height: "100%", zIndex: 2000 }}
      style={{ width: "100%", zIndex: 2500 }}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      type={type}
    >
      {/* https://mui.com/material-ui/react-alert/ */}
      <Alert
        severity={type}
        sx={{ width: "auto", bottom: 0, position: "absolute" }}
      >
        {message}
      </Alert>
    </CustomizedSnackbar>
  );
};

Snackbar.propTypes = {
  message: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default Snackbar;
