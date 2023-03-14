/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import * as React from "react";
import { SWMIcon } from "react-swm-icon-pack";
// import Box from "@mui/material/Box";
import { Avatar, Badge, Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

import imgDefaultAvatar from "../../assets/default-avatar.png";
import ActionDropdown from "../ActionDropdown/ActionDropdown";

const StyledBadge = styled(Badge)(({ theme, active }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: active === "true" ? "#44b700" : "#BDBDBD",
    color: active === "true" ? "#44b700" : "#BDBDBD",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,

    "&::after": {
      position: "absolute",
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "0.5px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2)",
      opacity: 0,
    },
  },
}));

const StyledAvatar = ({ active, avatar }) => {
  return (
    <StyledBadge
      overlap="circular"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      variant="dot"
      active={active.toString()}
    >
      <Avatar
        sx={{ width: 45, height: 45 }}
        variant="rounded"
        src={avatar || imgDefaultAvatar}
      />
    </StyledBadge>
  );
};

StyledAvatar.propTypes = {
  active: PropTypes.bool.isRequired,
  avatar: PropTypes.string,
};

StyledAvatar.defaultProps = {
  avatar: "",
};

const CardUsers = props => {
  const { info, actionEdit, actionDelete, actionActivate, actionDeactivate } =
    props;

  return (
    <Card
      style={{
        borderRadius: "13px",
        background: "rgba(255, 255, 255, 0.6)",
        border: "1px solid #FFFFFF",
        boxSizing: "border-box",
        boxShadow:
          "-10px -10px 15px rgba(140, 177, 189, 0.15), 10px 10px 15px rgba(140, 177, 189, 0.15)",
      }}
    >
      <CardHeader
        avatar={
          <StyledAvatar active={info.status === 1} avatar={info.avatar} />
        }
        action={
          info.userType !== "Owner" && (
            <ActionDropdown
              menuItems={[
                {
                  text: "View Permission",
                  icon: (
                    <SWMIcon
                      name="LockOff"
                      color="#666666"
                      size="26"
                      strokeWidth="1.5"
                      style={{
                        width: "24px",
                        color: "rgba(0, 0, 0, 0.5)",
                      }}
                    />
                  ),
                  mode: "Sidebar",
                  info,
                  action: actionEdit,
                },
                {
                  text: "Remove",
                  icon: (
                    <SWMIcon
                      name="Trash2"
                      color="#666666"
                      size="26"
                      strokeWidth="1.5"
                      style={{
                        width: "24px",
                        color: "rgba(0, 0, 0, 0.5)",
                      }}
                    />
                  ),
                  mode: "Dialog",
                  info,
                  action: actionDelete,
                },
                {
                  text: info.status === 1 ? "Deactivate" : "Activate",
                  icon: (
                    <SWMIcon
                      name={info.status === 1 ? "CrossCircle" : "CheckCircle"}
                      color="#666666"
                      size="26"
                      strokeWidth="1.5"
                      style={{
                        width: "24px",
                        color: "rgba(0, 0, 0, 0.5)",
                      }}
                    />
                  ),
                  mode: "Dialog",
                  info,
                  action: info.status === 1 ? actionDeactivate : actionActivate,
                },
              ]}
            />
          )
        }
      />
      <CardContent sx={{ paddingTop: 0, paddingBottom: 0 }}>
        <Typography sx={{ fontSize: 18, color: "rgba(0,0,0,0.7)" }}>
          {info.displayName}
        </Typography>
        <Typography sx={{ fontSize: 14, color: "rgba(0,0,0,0.6)" }}>
          {info.email}
        </Typography>
        <Box
          style={{
            display: "flex",
            marginTop: "24px",
          }}
        >
          <Box style={{ display: "flex", alignItems: "center" }}>
            <SWMIcon
              name="User1"
              color="#666666"
              size="16"
              strokeWidth="1.5"
              style={{
                width: "16px",
                color: "rgba(0, 0, 0, 0.7)",
              }}
            />
          </Box>
          <Typography
            style={{
              marginLeft: "8px",
              fontSize: "14px",
              color: "rgba(0, 0, 0, 0.6)",
              paddingBottom: 0,
            }}
          >
            {info.userType}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

CardUsers.propTypes = {
  info: PropTypes.shape().isRequired,
  actionEdit: PropTypes.func.isRequired,
  actionDelete: PropTypes.func.isRequired,
  actionActivate: PropTypes.func.isRequired,
  actionDeactivate: PropTypes.func.isRequired,
};

export default CardUsers;
