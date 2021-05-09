import React, { memo } from 'react';
import { Nav, Navbar, Row } from 'react-bootstrap';
import LIBMSLOGO from './assets/LibMSLOGO.png';
import * as IconName from 'react-icons/fa';
import { Link } from 'react-router-dom';

const navItemsTop = [
  { name: 'Dashboard', link: '/dashboard', icon: IconName.FaChartBar },
  { name: 'Library', link: '/books', icon: IconName.FaBook },
  { name: 'Reservations', link: '/dashboard', icon: IconName.FaRegListAlt },
  { name: 'Templates', link: '/dashboard', icon: IconName.FaColumns },
  { name: 'Categories', link: '/dashboard', icon: IconName.FaTag },
];
const navItemsBottom = [
  { name: 'Setting', link: '/dashboard', icon: IconName.FaCog },
  { name: 'Support', link: '/dashboard', icon: IconName.FaQuestionCircle },
];
const imgSource = LIBMSLOGO;

export const Sidebar = memo(() => {
  return (
    <>
      <div className="min-vh-100">
        <Navbar variant="light">
          <Nav className="flex-column">
            <Row className="mb-5">
              <img src={imgSource} alt="" width={200} height={101} />
            </Row>
            <Row className="flex-column mt-5 mb-5">
              {navItemsTop.map((navigate, i) => (
                <Nav.Link as={Link} to={navigate.link} key={i}>
                  <navigate.icon className="mr-2" />
                  {navigate.name}
                </Nav.Link>
              ))}
            </Row>
            <Row className="flex-column mt-5">
              {navItemsBottom.map((navigate, i) => (
                <Nav.Link as={Link} to={navigate.link} key={i}>
                  <navigate.icon className="mr-2" />
                  {navigate.name}
                </Nav.Link>
              ))}
            </Row>
          </Nav>
        </Navbar>
      </div>
    </>
  );
});
