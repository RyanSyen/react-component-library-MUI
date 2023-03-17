/* eslint-disable react/prop-types */
import React from "react";
import { usePagination } from "@mui/material";

const Pagination = props => {
  const { pageCount, currentPage, onPageChange } = props;

  const { items } = usePagination({
    count: pageCount,
    page: currentPage,
    // onChange: onPageChange,
    //* how to pass additional props when click on the button
    onChange: (event, value) => onPageChange(event, value, test),
  });

  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      {/* props in items: disabled, onClick, page, selected, type */}
      {items.map(({ page, type, selected, ...item }, index) => {
        let children = null;

        if (type === "start-ellipsis" || type === "end-ellipsis") {
          children = "...";
        } else if (type === "page") {
          children = (
            <button
              type="button"
              style={{ fontWeight: selected ? "bold" : undefined }}
              {...item}
            >
              {page}
            </button>
          );
        } else {
          children = (
            <button type="button" {...item}>
              {type}
            </button>
          );
        }

        // eslint-disable-next-line react/no-array-index-key
        return <div key={index}>{children}</div>;
      })}
    </div>
  );
};

export default Pagination;
