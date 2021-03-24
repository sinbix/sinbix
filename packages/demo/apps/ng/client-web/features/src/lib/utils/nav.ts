import { NavItem } from '@sinbix-common/utils';

export const MAIN_MENU: NavItem[] = [
  {
    title: 'home',
    url: '/',
  },
  {
    title: 'blog',
    url: '/blog',
  },
  {
    title: 'games',
    url: '/games',
  },
];

export const GUEST_MENU: NavItem[] = [
  {
    title: 'login',
    url: '/auth/login',
  },
  {
    title: 'register',
    url: '/auth/register',
  },
];
