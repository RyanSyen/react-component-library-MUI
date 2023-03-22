/**
 * lint issues
 *
 * 1. Visible, non-interactive elements with click handlers must have at least one keyboard listener
 * => lint: jsx-a11y/click-events-have-key-events
 * => follow accessibility guidelines WCAG 2.1.1
 * => scenario: using static elements like div as interactive button
 * => best practice is to use the button element for interactivity
 * => ✔ solution: enforce onClick with one of the following keyboard events: onKeyUp, onKeyDown, OnKeyPress
 * => source/docs: https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/click-events-have-key-events.md
 *
 * 2. Avoid non-native interactive elements. If using native HTML is not possible, add an appropriate role and support for tabbing, mouse, keyboard, and touch inputs to an interactive content element.
 * => lint: jsx-a11y/no-static-element-interactions
 * => scenario: using static elements like div as interactive button
 * => best practice is to use the button element for interactivity
 * => ✔ solution: requires static elements that are also interactive to have a role attribute
 * => source/docs: https://stackoverflow.com/questions/54274473/how-to-fix-static-html-elements-with-event-handlers-require-a-role/54274507#54274507
 *
 * 3. Elements with the 'button' interactive role must be focusable
 * => lint: jsx-a11y/interactive-supports-focus
 * => attribute to handle tab flow
 * => scenario: using static elements like div as interactive button
 * => best practice is to use the button element for interactivity
 * => ✔ solution: add tabIndex (avoid positive value)
 * => source/docs: https://stackoverflow.com/questions/56441825/how-to-fix-button-interactive-role-must-be-focusable
 * => Tabindex Best Practices: https://adrianroselli.com/2014/11/dont-use-tabindex-greater-than-0.html#:~:text=tabindex%20attribute.-,Tabindex%20Best%20Practices,-Here%20are%20some
 *
 * 4. 'prop-types' should be listed in the project's dependencies, not devDependencies
 * => prop-types should only be used for development, hence the lint is disabled for this package
 *
 *
 *
 * */

import React, { forwardRef } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import { useTreeItem } from "@mui/lab/TreeItem";
import Typography from "@mui/material/Typography";
import clsx from "clsx";
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from "prop-types";

import action from "./actions";
import treeViewHelper from "./helper";
import useTreeState from "./useTreeState";

// CustomContent refers to the content of the custom tree item, a HOC that accepts a ref props from its parent (TreeItem) and forwards it to the underlying 'div' below
// It is compulsory to put forwardRef to render the content but there is no requirement for the parent to access the ref of the 'div' exposed by CustomContent
// Usually forwardRef is used for forms handling, see docs: https://react.dev/reference/react/forwardRef#usage
const CustomContent = forwardRef(function CustomContent(props, ref) {
  // custom hooks & helpers
  const {
    state,
    updateRootTree,
    updateChildTree,
    updateChildFolderRef,
    insertNodes,
  } = useTreeState();
  //   const { convertJsonToTree, insertNodes } = treeViewHelper();
  const { fetchChildFolders } = action();

  // we can access props from the TreeItem component
  const {
    classes,
    className,
    nodeId,
    label,
    icon: iconProp,
    expansionIcon,
    displayIcon,
    folders,
  } = props;

  // [optional] but I disabled the linting for PropType check
  CustomContent.propTypes = {
    classes: PropTypes.elementType,
    className: PropTypes.string,
    nodeId: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.elementType,
    expansionIcon: PropTypes.element,
    displayIcon: PropTypes.element,
    folders: PropTypes.string.isRequired,
  };

  // useTreeItem hook to manage item's state by returning various properties and states using the nodeId
  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection,
  } = useTreeItem(nodeId);

  const handleMouseDown = event => {
    preventSelection(event);
  };

  const handleExpansionClick = event => {
    // get child folder tree ref
    const targetNode = state.childJsonRef.find(el => el.parentId === nodeId);

    // execute fetch child folders if no reference of child folders are found
    if (!targetNode) {
      fetchChildFolders(nodeId).then(result => {
        const childFolders = result;

        // update child folder reference
        updateChildFolderRef(childFolders);

        // convert json to tree
        const tree = insertNodes(childFolders);

        // update tree and render UI
        updateRootTree(tree);
      });
    }

    // update toggleable nodes state
    updateChildTree(nodeId);
    // dispatch({ type: "updateToggleableNodes", payload: nodeId });
    handleExpansion(event);
  };

  const handleSelectionClick = event => {
    handleSelection(event);
  };

  return (
    <div
      className={clsx(className, classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled,
      })}
      role="button"
      tabIndex={0}
      onMouseDown={handleMouseDown}
      ref={ref}
      style={{
        display: "flex",
        flexDirection: folders !== "0" ? "row-reverse" : "none",
        justifyContent: "space-between",
        padding: "8px 5px",
      }}
    >
      {folders !== "0" && (
        <div
          role="button"
          tabIndex={0}
          onClick={() => handleExpansionClick()}
          onKeyDown={() => handleExpansionClick()}
          className={classes.iconContainer}
        >
          {expanded ? <ExpandMoreIcon /> : <ChevronRightIcon />}
        </div>
      )}
      <div style={{ display: "flex" }}>
        <FolderOutlinedIcon sx={{ marginRight: "8px" }} />
        <Typography
          onClick={handleSelectionClick}
          component="div"
          className={classes.label}
        >
          {`${label} + ${nodeId}`}
        </Typography>
      </div>
    </div>
  );
});

export default CustomContent;
