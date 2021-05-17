import * as IconName from 'react-icons/fa';

export const dashboardFeatures = [
  { name: 'Dashboard', link: '/dashboard', icon: IconName.FaChartBar },
  { name: 'Library', link: '/dashboard/books', icon: IconName.FaBook },
  {
    name: 'Reservations',
    link: '/dashboard/reservations',
    icon: IconName.FaRegListAlt,
  },
  { name: 'Templates', link: '/dashboard', icon: IconName.FaColumns },
  { name: 'Categories', link: '/dashboard', icon: IconName.FaTag },
];
