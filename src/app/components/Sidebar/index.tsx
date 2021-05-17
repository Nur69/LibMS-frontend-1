import { dashboardFeatures } from 'app/configs/dashboard-features';
import React, { memo } from 'react';
import { Nav, Navbar, Row } from 'react-bootstrap';
import * as IconName from 'react-icons/fa';
import { Link } from 'react-router-dom';
import LIBMSLOGO from './assets/LibMSLOGO.png';

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
              {dashboardFeatures.map((navigate, i) => (
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
