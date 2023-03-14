import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";

const Popup = props => {
  const { children, title, popup, cancel, isOpen, onClose } = props;
  return (
    <Box>
      <Dialog
        open={isOpen}
        onClose={onClose}
        disableEscapeKeyDown
        onBackdropClick={() => {}}
        fullWidth
        maxWidth="xl"
        PaperProps={{ sx: { height: "70%", background: "white" } }}
        sx={{ zIndex: 2000 }}
      >
        <DialogTitle
          sx={{
            fontSize: { xs: "20px", md: "22px" },
            fontWeight: "600",
            padding: "25px",
            // paddingBottom: "20px",
            borderBottom: "1px solid rgba(0,0,0,0.12)",
          }}
        >
          <Box
            sx={{
              display: " flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              style={{
                fontSize: "28px",
                color: "rgba(0, 0, 0, 1)",
                fontWeight: "800",
              }}
            >
              {title}
            </Typography>
            <Box
              sx={{
                display: " flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                className="XyanButton"
                onClick={null}
                variant="contained"
                style={{ borderRadius: "20px" }}
              >
                {popup.text}
              </Button>
              <IconButton
                aria-label="close"
                onClick={e => {
                  if (cancel.onClick) {
                    cancel.onClick(e);
                  }
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent
          sx={{
            padding: "40px",
            paddingTop: "0px !important",
            display: "flex",
            alignItems: "center",
          }}
        >
          {children}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

Popup.propTypes = {
  title: PropTypes.string.isRequired,
  popup: PropTypes.shape().isRequired,
  cancel: PropTypes.shape().isRequired,
  children: PropTypes.shape(),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
};

Popup.defaultProps = {
  onClose: null,
  children: null,
};

export default Popup;
