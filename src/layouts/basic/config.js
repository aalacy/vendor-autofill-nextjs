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
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Vendor",
    path: "/vendor",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Crew",
    path: "/crew",
    icon: (
      <SvgIcon fontSize="small">
        <ContactIcon />
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
    title: "Settings",
    path: "/settings",
    icon: <SettingsIcon />,
    requireAdmin: true,
  },
];
