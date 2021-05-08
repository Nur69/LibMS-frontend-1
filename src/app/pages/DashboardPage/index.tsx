import { Sidebar } from 'app/components/Sidebar';
import React from 'react';
import LIBMSLOGO from '../../components/Sidebar/assets/LibMSLOGO.png';
import * as IconName from 'react-icons/fa';

export function DashboardPage() {
  const navItemsTop = [
    { name: 'Dashboard', link: '/', icon: IconName.FaChartBar },
    { name: 'Library', link: '/', icon: IconName.FaBook },
    { name: 'Reservations', link: '/', icon: IconName.FaRegListAlt },
    { name: 'Templates', link: '/', icon: IconName.FaColumns },
    { name: 'Categories', link: '/', icon: IconName.FaTag },
  ];
  const navItemsBottom = [
    { name: 'Setting', link: '/', icon: IconName.FaCog },
    { name: 'Support', link: '/', icon: IconName.FaQuestionCircle },
  ];
  return (
    <>
      <Sidebar
        imgSource={LIBMSLOGO}
        navItemsTop={navItemsTop}
        navItemsBottom={navItemsBottom}
      ></Sidebar>
    </>
  );
}
