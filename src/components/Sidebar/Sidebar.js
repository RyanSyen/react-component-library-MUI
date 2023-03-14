import CancelIcon from "@mui/icons-material/Cancel";
import { Box, Drawer } from "@mui/material";
import PropTypes from "prop-types";

const Sidebar = ({ children, isOpen, close }) => {
  const anchor = "right";

  return (
    <Box>
      <Drawer
        anchor={anchor}
        open={isOpen}
        sx={{
          zIndex: "1500",
          width: "1060px",
          "& .MuiDrawer-paper": {
            width: { xs: "100vw", md: "300px", lg: "1060px" },
          },
        }}
        ModalProps={{ onBackdropClick: close }}
      >
        <CancelIcon
          onClick={close}
          sx={{
            position: "absolute",
            right: "22px",
            top: "22px",
            color: "white",
            cursor: "pointer",
            fontSize: "30px",
          }}
        />
        {children}
      </Drawer>
    </Box>
  );
};

Sidebar.propTypes = {
  children: PropTypes.shape().isRequired,
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default Sidebar;
