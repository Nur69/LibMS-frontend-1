import React, { memo } from 'react';
import { Nav, Navbar, Row } from 'react-bootstrap';
import LIBMSLOGO from '../../components/Sidebar/assets/LibMSLOGO.png';
import * as IconName from 'react-icons/fa';
import styled from 'styled-components/macro';

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
const imgSource = LIBMSLOGO;

export const Sidebar = memo(() => {
  return (
    <>
      <div className="min-vh-100">
        <Row>
          <Navbar variant="light">
            <Nav className="flex-column mb-auto">
              <Row className="mb-5">
                <img src={imgSource} alt="" width={200} height={101} />
              </Row>
              <Row className="flex-column mt-5 mb-5">
                {navItemsTop.map(navigate => (
                  <CustomNavLink href={navigate.link}>
                    <navigate.icon className="mr-2" />
                    {navigate.name}
                  </CustomNavLink>
                ))}
              </Row>
              <Row className="flex-column mt-5">
                {navItemsBottom.map(navigate => (
                  <CustomNavLink href={navigate.link}>
                    <navigate.icon className="mr-2" />
                    {navigate.name}
                  </CustomNavLink>
                ))}
              </Row>
            </Nav>
          </Navbar>
        </Row>
      </div>
    </>
  );
});

const CustomNavLink = styled(Nav.Link)``;
