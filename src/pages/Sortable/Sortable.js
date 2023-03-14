/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */

import { useState } from "react";
import { SWMIcon } from "react-swm-icon-pack";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import { styled as muiStyled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import styled from "styled-components";

import Drag from "../../assets/drag.png";

// import { styled as style } from "styled-components";
import styles from "./Sortable.styles.css";

const Accordion = muiStyled(props => (
  <MuiAccordion id="accordion" disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  // border: `1px solid ${theme.palette.divider}`,
  marginBottom: 24,
  "&:not(:last-child)": {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  "&:before": {
    display: "none",
  },
}));
const AccordionSummary = muiStyled(props => (
  <MuiAccordionSummary expandIcon={<ExpandMoreIcon />} {...props} />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(180deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
  "& .MuiAccordionSummary-root": {
    borderBottom: 0,
  },
}));
const AccordionDetails = muiStyled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const DragIconWrapper = styled.div`
  display: inline-block;
  svg {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    padding-right: 1rem;
  }
`;
const ListContainer = styled.div`
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  margin: 2rem auto;
  max-width: 30rem;
  padding: 0.5rem 2rem 2rem;
  border-radius: 0.2rem;
  box-shadow: 0.1rem 0.1rem 0.4rem #aaaaaa;
`;
const ListItem = styled.div`
  color: #444444;
  padding: 0.8rem 0.3rem;
  /* border-bottom: 1px solid #dddddd; */
  &:last-child {
    border-bottom: none;
  }
  span {
    display: inline-block;
    vertical-align: middle;
  }
  /* background: white; */
`;

// set as state, we setState to update the order of the accordion
// when we console.log we can see the udpated order
const contentItem = {
  groups: [
    {
      id: 0,
      name: "Basic Group",
    },
    {
      id: 1,
      name: "Advanced Group",
    },
    {
      id: 2,
      name: "Other Group ",
    },
    {
      id: 3,
      name: "New Group",
    },
  ],
};

const SortableDND = () => {
  const [list, setList] = useState(contentItem.groups);
  const [list2, setList2] = useState(contentItem.groups);

  return (
    <div className="App">
      {/* accordion 1 */}
      <Accordion
        sx={{
          borderBottom: "1px solid rgba(0,0,0,0.12)",
        }}
      >
        <AccordionSummary
          aria-controls="panel1d-content"
          style={{
            paddingLeft: 0,
            margin: 0,
            background: "none",
          }}
        >
          {/* <SWMIcon
            name="MessageSquareLines"
            color="#666666"
            size="26"
            strokeWidth="1.5"
          /> */}
          {/* <Typography
            style={{
              marginLeft: "24px",
              fontSize: "14px",
              fontWeight: 700,
              color: "rgba(0, 0, 0, 0.6)",
            }}
          >
            Test
          </Typography> */}
          <h1>Test</h1>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            display: "flex",
            justifyContent: "space-between",
            border: "none",
            paddingTop: 0,
            paddingBottom: 0,
          }}
        >
          <Box
            style={{
              width: "100%",
              marginTop: "20px",
              alignItems: "center",
              marginLeft: "16px",
            }}
          >
            <DragDropContext
              onDragEnd={param => {
                const srcI = param.source.index;
                const desI = param.destination?.index;
                if (desI !== null) {
                  const newList = [...list];
                  newList.splice(desI, 0, newList.splice(srcI, 1)[0]);
                  setList(newList);
                }
              }}
            >
              <Droppable droppableId="droppable-1">
                {(provided, _) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {list.map((item, i) => (
                      <Draggable
                        key={i}
                        draggableId={`draggable-${i}`}
                        index={i}
                      >
                        {(provided, snapshot) => (
                          <ListItem
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            style={{
                              ...provided.draggableProps.style,
                              // boxShadow: snapshot.isDragging
                              //   ? "0 0 .4rem #666"
                              //   : "none",
                              // boxShadow: "none",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <DragIconWrapper {...provided.dragHandleProps}>
                              <img
                                style={{
                                  height: "20px",
                                  marginBottom: "14px",
                                  userSelect: "none",
                                }}
                                src={Drag}
                                alt="icon"
                              />
                            </DragIconWrapper>
                            <Accordion
                              key={item.name}
                              sx={{
                                borderBottom:
                                  i === item.length - 1
                                    ? "1px solid rgba(0,0,0,0.12)"
                                    : 0,
                                width: "100%",
                                marginBottom: "14px",
                              }}
                            >
                              <AccordionSummary
                                aria-controls="panel1d-content"
                                style={{
                                  paddingLeft: 0,
                                  margin: 0,
                                  background: "none",
                                }}
                              >
                                <Typography
                                  style={{
                                    marginLeft: "24px",
                                    fontSize: "14px",
                                    fontWeight: 700,
                                    color: "rgba(0, 0, 0, 0.6)",
                                  }}
                                >
                                  {item.name}
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  border: "none",
                                  paddingTop: 0,
                                  paddingBottom: 0,
                                }}
                              >
                                <Box
                                  style={{
                                    width: "100%",
                                    marginTop: "20px",
                                    alignItems: "center",
                                    marginLeft: "16px",
                                  }}
                                >
                                  <Typography
                                    style={{
                                      fontSize: "14px",
                                      color: "rgba(0, 0, 0, 0.6)",
                                    }}
                                  >
                                    {item.name}
                                  </Typography>
                                </Box>
                              </AccordionDetails>
                            </Accordion>
                          </ListItem>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* accordion 2 */}
      <Accordion
        sx={{
          borderBottom: "1px solid rgba(0,0,0,0.12)",
        }}
      >
        <AccordionSummary
          aria-controls="panel1d-content"
          style={{
            paddingLeft: 0,
            margin: 0,
            background: "none",
          }}
        >
          {/* <SWMIcon
            name="MessageSquareLines"
            color="#666666"
            size="26"
            strokeWidth="1.5"
          /> */}
          {/* <Typography
            style={{
              marginLeft: "24px",
              fontSize: "14px",
              fontWeight: 700,
              color: "rgba(0, 0, 0, 0.6)",
            }}
          >
            <h1>Test 2</h1>
          </Typography> */}
          <h1>Test 2</h1>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            display: "flex",
            justifyContent: "space-between",
            border: "none",
            paddingTop: 0,
            paddingBottom: 0,
          }}
        >
          <Box
            style={{
              width: "100%",
              marginTop: "20px",
              alignItems: "center",
              marginLeft: "16px",
            }}
          >
            <DragDropContext
              onDragEnd={param => {
                const srcI = param.source.index;
                const desI = param.destination?.index;
                if (desI !== null) {
                  const newList = [...list2];
                  newList.splice(desI, 0, newList.splice(srcI, 1)[0]);
                  setList2(newList);
                }
              }}
            >
              <Droppable droppableId="droppable-2">
                {(provided, _) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {list2.map((item, i) => (
                      <Draggable
                        key={i}
                        draggableId={`draggable2-${i}`}
                        index={i}
                      >
                        {(provided, snapshot) => (
                          <ListItem
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            style={{
                              ...provided.draggableProps.style,
                              // boxShadow: snapshot.isDragging
                              //   ? "0 0 .4rem #666"
                              //   : "none",
                              // boxShadow: "none",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <DragIconWrapper {...provided.dragHandleProps}>
                              <img
                                style={{
                                  height: "20px",
                                  marginBottom: "14px",
                                  userSelect: "none",
                                }}
                                src={Drag}
                                alt="icon"
                              />
                            </DragIconWrapper>
                            <Accordion
                              key={item.name}
                              sx={{
                                borderBottom:
                                  i === item.length - 1
                                    ? "1px solid rgba(0,0,0,0.12)"
                                    : 0,
                                width: "100%",
                                marginBottom: "14px",
                              }}
                            >
                              <AccordionSummary
                                aria-controls="panel1d-content"
                                style={{
                                  paddingLeft: 0,
                                  margin: 0,
                                  background: "none",
                                }}
                              >
                                <Typography
                                  style={{
                                    marginLeft: "24px",
                                    fontSize: "14px",
                                    fontWeight: 700,
                                    color: "rgba(0, 0, 0, 0.6)",
                                  }}
                                >
                                  {item.name}
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  border: "none",
                                  paddingTop: 0,
                                  paddingBottom: 0,
                                }}
                              >
                                <Box
                                  style={{
                                    width: "100%",
                                    marginTop: "20px",
                                    alignItems: "center",
                                    marginLeft: "16px",
                                  }}
                                >
                                  <Typography
                                    style={{
                                      fontSize: "14px",
                                      color: "rgba(0, 0, 0, 0.6)",
                                    }}
                                  >
                                    {item.name}
                                  </Typography>
                                </Box>
                              </AccordionDetails>
                            </Accordion>
                          </ListItem>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </Box>
        </AccordionDetails>
      </Accordion>
      {/* <DragDropContext
        onDragEnd={param => {
          const srcI = param.source.index;
          const desI = param.destination?.index;
          if (desI !== null) {
            const newList = [...list];
            newList.splice(desI, 0, newList.splice(srcI, 1)[0]);
            setList(newList);
          }
        }}
      >
        <Droppable droppableId="droppable-1">
          {(provided, _) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {list.map((item, i) => (
                <Draggable key={i} draggableId={`draggable-${i}`} index={i}>
                  {(provided, snapshot) => (
                    <ListItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      style={{
                        ...provided.draggableProps.style,
                        // boxShadow: snapshot.isDragging
                        //   ? "0 0 .4rem #666"
                        //   : "none",
                        // boxShadow: "none",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <DragIconWrapper {...provided.dragHandleProps}>
                        <img
                          style={{
                            height: "20px",
                            marginBottom: "14px",
                            userSelect: "none",
                          }}
                          src={Drag}
                          alt="icon"
                        />
                      </DragIconWrapper>
                      <Accordion
                        key={item.name}
                        sx={{
                          borderBottom:
                            i === item.length - 1
                              ? "1px solid rgba(0,0,0,0.12)"
                              : 0,
                          width: "100%",
                          marginBottom: "14px",
                        }}
                      >
                        <AccordionSummary
                          aria-controls="panel1d-content"
                          style={{
                            paddingLeft: 0,
                            margin: 0,
                            background: "none",
                          }}
                        >
                          <Typography
                            style={{
                              marginLeft: "24px",
                              fontSize: "14px",
                              fontWeight: 700,
                              color: "rgba(0, 0, 0, 0.6)",
                            }}
                          >
                            {item.name}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            border: "none",
                            paddingTop: 0,
                            paddingBottom: 0,
                          }}
                        >
                          <Box
                            style={{
                              width: "100%",
                              marginTop: "20px",
                              alignItems: "center",
                              marginLeft: "16px",
                            }}
                          >
                            <Typography
                              style={{
                                fontSize: "14px",
                                color: "rgba(0, 0, 0, 0.6)",
                              }}
                            >
                              {item.name}
                            </Typography>
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                    </ListItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext> */}
    </div>
  );
};

export default SortableDND;
