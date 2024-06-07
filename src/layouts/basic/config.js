import ChartBarIcon from "@mui/icons-material/BarChart";
import UserIcon from "@mui/icons-material/Person";
import { SvgIcon } from "@mui/material";
import {
  GroupOutlined as ContactIcon,
  CloudCircle as FileIcon,
  RadarOutlined as MileageIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";

export const items = [
  {
    title: "Account",
    path: "/account",
    icon: <UserIcon />,
  },
  {
    title: "Vendor",
    path: "/vendor",
    icon: <ChartBarIcon />,
  },
  {
    title: "Crew",
    path: "/crew",
    icon: <ContactIcon />,
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
    title: "Settings",
    path: "/settings",
    icon: <SettingsIcon />,
    requireAdmin: true,
  },
];
