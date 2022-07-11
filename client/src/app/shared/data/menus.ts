export interface Menu {
  path: string;
  name: string;
}

export const menuList: Menu[] = [
  {
    path: '',
    name: 'Home'
  },
  {
    path: '/products',
    name: 'Sell'
  },
  {
    path: '/about',
    name: 'About'
  },
  {
    path: '/contact',
    name: 'How it works ?'
  },
  {
    path: '/contact',
    name: 'track order'
  },
  /*
  {
    path: '/dashboard',
    name: 'Dashboard'
  },
  {
    path: '/doc',
    name: 'Doc'
  }*/
];
