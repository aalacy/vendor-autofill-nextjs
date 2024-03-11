import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import CogIcon from "@heroicons/react/24/solid/CogIcon";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import { SvgIcon } from "@mui/material";
import {
  PictureAsPdf as PageviewIcon,
  GroupOutlined as ContactIcon,
  CloudCircle as FileIcon,
  RadarOutlined as MileageIcon,
  DynamicForm as JobFormIcon
} from "@mui/icons-material";

export const items = [
  {
    title: "Vendor Forms",
    path: "/",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Job Files",
    path: "/view",
    icon: <PageviewIcon />,
  },
  {
    title: "Account",
    path: "/account",
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Contacts",
    path: "/contacts",
    icon: (
      <SvgIcon fontSize="small">
        <ContactIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Job Form",
    path: "/job-form",
    icon: (
      <SvgIcon fontSize="small">
        <JobFormIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Files",
    path: "/files",
    icon: <FileIcon />,
  },
  {
    title: "Mileage Forms",
    path: "/mileage-forms",
    icon: <MileageIcon />,
  },
  {
    title: "Project Settings",
    path: "/project-settings",
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    ),
  },
];
