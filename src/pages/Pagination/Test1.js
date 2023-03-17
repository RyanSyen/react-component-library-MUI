/* eslint-disable no-shadow */
/* eslint-disable radix */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { usePagination } from "@mui/material";

const data = require("./MOCK_DATA.json");

const Test1 = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  // cal total pages based on number of items and items per page
  const pageCount = Math.ceil(data.length / itemsPerPage);
  const test = "test";

  // slice data array based on current page and number of items per page
  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // handle page change
  const onPageChange = (event, value, ...props) => {
    console.log(...props, value);
    setCurrentPage(value);
  };

  // the property 'items' refers to the number of buttons on the pagination list
  // e.g. 'previous', '1', '2', '3', '4', '5', '...', '100', 'next' -> total 9 objects in the items property
  const { items } = usePagination({
    count: pageCount,
    page: currentPage,
    // onChange: onPageChange,
    //* how to pass additional props when click on the button
    onChange: (event, value) => onPageChange(event, value, test),
  });

  console.log(items);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
              <td>{item.email}</td>
              <td>{item.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
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

          return <div key={index}>{children}</div>;
        })}
      </div>
    </div>
  );
};

export default Test1;
