/* eslint-disable no-unused-vars */
import FeedbackView from "../pages/Feedback/Feedback";
import { BackToTop, NavbarView } from "../pages/Navbar";
import PaginationView from "../pages/Pagination";
import Placeholder from "../pages/Placeholder";
// import { DefaultSortable, Sortable, SortableDND } from "../pages/Sortable";
import SortableDND from "../pages/Sortable/Sortable";
import TreeView from "../pages/Treeview/Treeview";

const unauthenticatedRoute = Object.freeze([
  {
    id: "Placeholder",
    name: "Placeholder",
    path: "/placeholder",
    element: <Placeholder />,
  },
  {
    id: "SortableDND",
    name: "SortableDND",
    path: "/sortable",
    element: <SortableDND />,
  },
  {
    id: "TreeView",
    name: "TreeView",
    path: "/treeview",
    element: <TreeView />,
  },
  {
    id: "PaginationView",
    name: "PaginationView",
    path: "/paginationview",
    element: <PaginationView />,
  },
  {
    id: "FeedbackView",
    name: "FeedbackView",
    path: "/feedbackview",
    element: <FeedbackView />,
  },
  {
    id: "NavbarView",
    name: "NavbarView",
    path: "/navbarview",
    element: <BackToTop />,
  },
]);

export default unauthenticatedRoute;
