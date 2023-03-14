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
]);

export default unauthenticatedRoute;
