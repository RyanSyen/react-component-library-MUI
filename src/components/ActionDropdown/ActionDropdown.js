import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

const ActionDropdown = props => {
  const initialState = {
    anchorEl: null,
  };

  const [values, setValues] = useState(initialState);

  const handleClick = event => {
    setValues({
      anchorEl: event.target,
    });
  };
  const { menuItems, handleAction, color } = props;
  const handleClose = (e, menuItem) => {
    setValues({
      anchorEl: null,
    });
    if (menuItem.action) {
      menuItem.action(e);
    }
    if (menuItem.setContent) {
      menuItem.setContent();
    }
    if (menuItem.dynamic) {
      menuItem.dynamic(
        menuItem.info.title ||
          menuItem.info.category ||
          menuItem.info.question ||
          menuItem.info.name ||
          menuItem.info.email ||
          menuItem.info.displayText,
      );
    }
    // notifications
    if (handleAction && handleAction(menuItem.text)) {
      handleAction();
    }
  };

  const getRandomInt = max => {
    return Math.floor(Math.random() * max);
  };
  const CustomizedMenu = styled(props1 => <Menu {...props1} />)(() => ({
    "& .MuiPaper-root": {
      borderRadius: "10px",
      background: "rgba(255,255,255,.9)",
      boxShadow: "0 2px  20px rgba(0, 0, 0, 0.12)",
    },
  }));
  const ModifiedMenuItem = styled(MenuItem)(({ info }) => ({
    opacity: info.mute ? 0.38 : 1,
  }));

  return (
    <Box>
      <IconButton
        onClick={handleClick}
        sx={{ color: color || "rgba(0, 0, 0, 0.54)", fontSize: "22px" }}
      >
        <MoreVertIcon />
      </IconButton>
      <CustomizedMenu
        anchorEl={values.anchorEl}
        open={Boolean(values.anchorEl)}
        onClose={() =>
          setValues({
            anchorEl: null,
          })
        }
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        style={{ zIndex: "1500", borderRadius: "8px" }}
      >
        {menuItems.map(menuItem => {
          if (menuItem.hidden) {
            return null;
          }

          return (
            <ModifiedMenuItem
              info={menuItem}
              key={getRandomInt(100000000000)}
              classes={menuItem.className}
              onClick={e => {
                handleClose(e, menuItem);
              }}
              disabled={menuItem.disabled}
              style={{ color: "rgba(0,0,0,.7)" }}
            >
              <ListItemIcon key={getRandomInt(100000000000)}>
                {menuItem.icon}
              </ListItemIcon>
              <ListItemText
                disableTypography
                sx={{ fontSize: "16px" }}
                key={getRandomInt(100000000000)}
              >
                {menuItem.text}
              </ListItemText>
            </ModifiedMenuItem>
          );
        })}
      </CustomizedMenu>
    </Box>
  );
};

ActionDropdown.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      icon: PropTypes.element.isRequired,
      action: PropTypes.func.isRequired,
    }),
  ).isRequired,
  handleAction: PropTypes.func,
  // id: PropTypes.number,
  color: PropTypes.string,
};

ActionDropdown.defaultProps = {
  handleAction: null,
  // id: 999,
  color: "rgba(0, 0, 0, 0.54)",
};

export default ActionDropdown;
