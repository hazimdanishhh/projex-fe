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
    { label: "Documents", icon: Folders, path: "workspace/documents" },
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
    { label: "All Users", icon: Users, path: "admin/users" },
    { label: "Create User", icon: UserPlus, path: "admin/create-user" },
    { label: "Roles & Permissions", icon: Gear, path: "admin/roles" },
    { label: "Audit Logs", icon: FileText, path: "admin/audit-logs" },
    { label: "System Settings", icon: Gear, path: "admin/settings" },
  ],
};

// =============================
// Department-based Structure
// =============================

export const sideNavLinkData = {
  // Default users (no specific department)
  general: [commonSegment, workspaceSegment, supportSegment],

  // Admin override (has full system control)
  admin: [commonSegment, workspaceSegment, adminSegment],
};
