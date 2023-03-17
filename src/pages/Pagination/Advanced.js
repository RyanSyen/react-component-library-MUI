import * as React from "react";
import { styled } from "@mui/material/styles";
import usePagination from "@mui/material/usePagination";

const List = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
});

const Advanced = () => {
  const { items } = usePagination({
    count: 10,
  });

  const clickHandler = type => {
    console.log(type);
  };

  return (
    <nav>
      <List>
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          if (type === "start-ellipsis" || type === "end-ellipsis") {
            children = "…";
          } else if (type === "page") {
            children = (
              <button
                type="button"
                style={{
                  fontWeight: selected ? "bold" : undefined,
                }}
                {...item}
              >
                {page}
              </button>
            );
          } else {
            children = (
              <button
                type="button"
                onClick={() => clickHandler(type)}
                {...item}
              >
                {type}
              </button>
            );
          }

          // eslint-disable-next-line react/no-array-index-key
          return <li key={index}>{children}</li>;
        })}
      </List>
    </nav>
  );
};

export default Advanced;
