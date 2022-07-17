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
    path: '/contact',
    name: 'How it works ?'
  },
  {
    path: '/about',
    name: 'About Us'
  },
  {
    path: '/contact',
    name: 'Track order'
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
