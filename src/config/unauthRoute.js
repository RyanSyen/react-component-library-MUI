/* eslint-disable no-unused-vars */
import { lazy, Suspense } from "react";

import FeedbackView from "../pages/Feedback/Feedback";
import ResponsiveGrid from "../pages/Grid/index";
import { BackToTop, NavbarView } from "../pages/Navbar";
import PaginationView from "../pages/Pagination";
import Placeholder from "../pages/Placeholder";
import { RefactoredTreeView } from "../pages/Refactored_Treeview/index";
// import { DefaultSortable, Sortable, SortableDND } from "../pages/Sortable";
import SortableDND from "../pages/Sortable/Sortable";
import TreeView from "../pages/Treeview/Treeview";

const MyComponent = lazy(() => import("../pages/Lazy/MyComponent"));

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
  {
    id: "ResponsiveGrid",
    name: "ResponsiveGrid",
    path: "/responsivegrid",
    element: <ResponsiveGrid />,
  },
  {
    id: "Lazy",
    name: "Lazy",
    path: "/lazy",
    element: (
      <Suspense fallback={<div>loading...</div>}>
        <MyComponent />
      </Suspense>
    ),
  },
  {
    id: "RefactoredTreeView",
    name: "RefactoredTreeView",
    path: "/refactored-tree-view",
    element: <RefactoredTreeView />,
  },
]);

export default unauthenticatedRoute;
