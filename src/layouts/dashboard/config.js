import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import { SvgIcon } from '@mui/material';
import { PictureAsPdf as PageviewIcon } from '@mui/icons-material';

export const items = [
  {
    title: 'Home',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Project Settings',
    path: '/project-settings',
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    )
  },
  {
    title: 'PDF View',
    path: '/view',
    icon: (
      <PageviewIcon />
    )
  },
  {
    title: 'Account',
    path: '/account',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    )
  },
];
