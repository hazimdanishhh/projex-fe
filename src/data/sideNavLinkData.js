// src/data/sideNavLinkData.js
import {
  House,
  UserCircle,
  SquaresFour,
  ListDashes,
  Folders,
  Users,
  UserPlus,
  FileText,
  Gear,
  Question,
} from "phosphor-react";

// =============================
// Reusable Segment Templates
// =============================

// 🧭 COMMON — accessible to everyone
const commonSegment = {
  segmentTitle: null,
  segmentCode: null,
  links: [
    { label: "Dashboard", icon: House, path: "dashboard" },
    { label: "Profile", icon: UserCircle, path: "profile" },
  ],
};

// 💼 WORKSPACE — universal collaboration tools
const workspaceSegment = {
  segmentTitle: "WORKSPACE",
  segmentCode: "SPACE",
  links: [
    { label: "Projects", icon: SquaresFour, path: "workspace/projects" },
    { label: "Tasks", icon: ListDashes, path: "workspace/tasks" },
  ],
};

const supportSegment = {
  segmentTitle: null,
  segmentCode: null,
  links: [{ label: "Help & Support", icon: Question, path: "help" }],
};

// ⚙️ ADMIN — full control over system management
const adminSegment = {
  segmentTitle: "ADMIN",
  links: [
    { label: "Dashboard", icon: House, path: "dashboard" },
    { label: "Admin Profile", icon: UserCircle, path: "profile" },
    // { label: "All Users", icon: Users, path: "users" },
    { label: "Create User", icon: UserPlus, path: "create-user" },
  ],
};

// =============================
// Department-based Structure
// =============================

export const sideNavLinkData = {
  // Default users (no specific department)
  general: [commonSegment, workspaceSegment, supportSegment],

  // Admin override (has full system control)
  admin: [adminSegment],
};
