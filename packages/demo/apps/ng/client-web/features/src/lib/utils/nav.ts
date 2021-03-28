import { NavItem } from '@sinbix-common/utils';

const MAIN_MENU_WITHOUT_DEMO: NavItem[] = [
  {
    title: 'home',
    url: '/',
    exactMatch: true,
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

function getDemoMenu(levels: number[]) {
  const menu = [];
  const n = levels.shift();
  for (let i = 0; i < n; i++) {
    const level = { title: 'demo', children: [] };
    level.children.push(...getDemoMenu([...levels]));
    menu.push(...[...MAIN_MENU_WITHOUT_DEMO, level]);
  }

  return menu;
}

export const MAIN_MENU: NavItem[] = [
  ...MAIN_MENU_WITHOUT_DEMO,
  {
    title: 'demo',
    children: getDemoMenu([1, 2, 3, 4, 5, 4, 3, 2, 1]),
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
