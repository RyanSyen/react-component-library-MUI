/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable prettier/prettier */
import { forwardRef } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTreeItem } from "@mui/lab/TreeItem";
import Typography from "@mui/material/Typography";
import clsx from "clsx";

const CustomContent = forwardRef(function CustomContent(props, ref) {
  const {
    classes,
    className,
    label,
    nodeId,
    icon: iconProp,
    expansionIcon,
    displayIcon,
    folders,
  } = props;

  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection,
  } = useTreeItem(nodeId);

  const icon = iconProp || expansionIcon || displayIcon;

  const handleMouseDown = (event) => {
    preventSelection(event);
  };

  const handleExpansionClick = (event) => {
    // handleExpansion(event);
    // get child folder tree ref
    // execute fetch child folders if no reference of child folders are found
    // update child folder reference
    // convert json to tree
    // update tree and render ui
  };

  const handleSelectionClick = (event) => {
    handleSelection(event);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={clsx(className, classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled,
      })}
      onMouseDown={handleMouseDown}
      ref={ref}
      style={{
        display: "flex",
        flexDirection: folders !== "0" ? "row-reverse" : "none",
        justifyContent: "space-between",
        padding: "8px 5px",
      }}
    >
      {/* //> show icon based on folders */}
      {folders !== "0" && (
        <div
          onClick={() => {
            handleExpansionClick();
          }}
          className={classes.iconContainer}
        >
          {expanded ? <ExpandMoreIcon /> : <ChevronRightIcon />}
        </div>
      )}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div onClick={handleExpansionClick} className={classes.iconContainer}>
        {icon}
      </div>
      <Typography
        onClick={handleSelectionClick}
        component="div"
        className={classes.label}
      >
        {label}
      </Typography>
    </div>
  );
});

export default CustomContent;
