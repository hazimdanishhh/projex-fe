import { Folders, ListDashes, SquaresFour } from "phosphor-react";

export const quickActionsHome = [
  {
    icon: SquaresFour,
    name: "Create Project",
    path: "/user/workspace/projects",
  },
  {
    icon: ListDashes,
    name: "Create Task",
    path: "/user/workspace/tasks",
  },
  {
    icon: Folders,
    name: "Add Document",
    path: "/user/workspace/documents",
  },
];
