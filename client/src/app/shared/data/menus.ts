export interface Menu {
  path: string;
  name: string;
}

export const menuList: Menu[] = [
  {
    path: '',
    name: 'Home'
  },
  // {
  //   path: '/how-it-works',
  //   name: 'How It Works ?'
  // },
  {
    path: '/contact',
    name: 'Contact Us'
  }
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

export const mobileMenuList: Menu[] = [
  {
    path: '',
    name: 'Home'
  },
  {
    path: '/how-it-works',
    name: 'How It Works ?'
  },
  {
    path: '/contact',
    name: 'Contact Us'
  }
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