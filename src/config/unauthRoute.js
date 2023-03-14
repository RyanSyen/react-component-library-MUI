import Placeholder from "../pages/Placeholder";
// import { DefaultSortable, Sortable, SortableDND } from "../pages/Sortable";

const unauthenticatedRoute = Object.freeze([
  {
    id: "Placeholder",
    name: "Placeholder",
    path: "/placeholder",
    element: <Placeholder />,
  },
  // {
  //   id: "Sortable",
  //   name: "Sortable",
  //   path: "/sortable",
  //   element: <Sortable />,
  // },
  // {
  //   id: "Default_Sortable",
  //   name: "Default Sortable",
  //   path: "/default-sortable",
  //   element: <DefaultSortable />,
  // },
  // {
  //   id: "SortableDND",
  //   name: "SortableDND",
  //   path: "/sortabelDND",
  //   element: <SortableDND />,
  // },
]);

export default unauthenticatedRoute;
