export interface NavItem {
  title: string;
  path: string;
  icon?: string;
  active: boolean;
  collapsible: boolean;
  sublist?: NavItem[];
}

const navItems: NavItem[] = [
  {
    title: 'Home',
    path: '/',
    icon: 'ion:home-sharp',
    active: true,
    collapsible: false,
    sublist: [
      {
        title: 'Dashboard',
        path: '/',
        active: false,
        collapsible: false,
      },
      {
        title: 'Sales',
        path: '/sales',
        active: false,
        collapsible: false,
      },
    ],
  }, {
    title: 'Requests',
    path: '/orders',
    icon: 'mdi:clipboard-list', 
    active: true,
    collapsible: true,
    sublist: [
      {
        title: 'Request New Completed',
        path: '',
        active: true,
        collapsible: false,
      }
    ],
  },

  {
    title: 'Taxi',
    path: '/taxi',
    icon: 'mdi:taxi',
    active: true,
    collapsible: true,
    sublist: [
      {
        title: 'all taxi',
        path: '',
        active: true,
        collapsible: false,
      },
      {
        title: 'Add Taxi',
        path: 'add-taxi',
        active: true,
        collapsible: false,
      },
    ],
  },
  {
    title: 'Drivers',
    path: '/drivers',
    icon: 'tabler:steering-wheel',
    active: true,
    collapsible: true,
    sublist: [
      {
        title: 'Add Driver',
        path: 'add-driver',
        active: true,
        collapsible: false,
      },
      {
        title: 'View Drivers',
        path: '',
        active: true,
        collapsible: false,
      },
    ],
  },
  {
    title: 'Settings',
    path: '/setting',
    icon: 'mdi:cog',
    active: true,
    collapsible: true,
    sublist: [
      {
        title: 'About Us',
        path: 'about',
        active: true,
        collapsible: false,
      },
      {
        title: 'Profile',
        path: 'profile',
        active: true,
        collapsible: false,
      },
    ],
  },
  {
    title: 'Offers',
    path: '/offers',
    icon: 'mdi:tag-multiple', // أيقونة العروض
    active: true,
    collapsible: true,
    sublist: [
      {
        title: 'All Offers',
        path: '',
        active: true,
        collapsible: false,
      },
      {
        title: 'Create Offer',
        path: 'o-create',
        active: true,
        collapsible: false,
      },
      /*  {
         title: 'Detailse Offer',
         path: 'o-detailse',
         active: true,
         collapsible: false,
       }, */
    ],
  },
  {
    title: 'Services',
    path: '/services',
    icon: 'mdi:briefcase', // أيقونة الخدمات
    active: true,
    collapsible: true,
    sublist: [
      {
        title: 'All Services',
        path: '',
        active: true,
        collapsible: false,
      },
      {
        title: 'Create Service',
        path: 's-create',
        active: true,
        collapsible: false,
      },
      /* {
        title: 'details Service',
        path: 's-details',
        active: true,
        collapsible: false,
      }, */
    ],
  },

  {
    title: 'Reports',
    path: '/reports',
    icon: 'mdi:chart-line',
    active: true,
    collapsible: true,
    sublist: [
      {
        title: 'Reports',
        path: '',
        active: true,
        collapsible: false,
      },
    ],
  },
  {
    title: 'Calculations',
    path: '/calculations',
    icon: 'mdi:email', // أيقونة الاتصال
    active: true,
    collapsible: true,
    sublist: [
      {
        title: 'Calculations view',
        path: '',
        active: true,
        collapsible: false,
      }
      ,
    ]
  },
  {
    title: 'Contact',
    path: '#',
    icon: 'mdi:email', // أيقونة الاتصال
    active: false,
    collapsible: false,
    sublist: [
      {
        title: 'Info Contact',
        path: '',
        active: true,
        collapsible: false,
      },
      {
        title: 'User Message',
        path: 'u-message',
        active: true,
        collapsible: false,
      },
    ],
  },
];

export default navItems;
