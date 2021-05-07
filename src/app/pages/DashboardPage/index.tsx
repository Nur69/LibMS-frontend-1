import React from 'react';
import { Col, Nav, Navbar, Row } from 'react-bootstrap';
import * as IconName from 'react-icons/fa';

import LIBMSLOGO from './assets/LibMSLOGO.png';

export function DashboardPage() {
  return (
    <>
      <div className="min-vh-100">
        <Row>
          <Col xs={2} className="d-flex min-vh-100 justify-content-center">
            <Navbar variant="light">
              <Nav className="flex-column mb-auto">
                <Row className="mb-5">
                  <img src={LIBMSLOGO} alt="" width={200} height={101} />
                </Row>
                <Row className="flex-column mt-5 mb-5">
                  <Nav.Link href="/home">
                    <IconName.FaChartBar className="mr-2" />
                    Dashboard
                  </Nav.Link>
                  <Nav.Link eventKey="link-1">
                    <IconName.FaBook className="mr-2" />
                    Library
                  </Nav.Link>
                  <Nav.Link eventKey="link-2">
                    <IconName.FaRegListAlt className="mr-2" />
                    Reservations
                  </Nav.Link>
                  <Nav.Link eventKey="link-3">
                    <IconName.FaColumns className="mr-2" />
                    Templates
                  </Nav.Link>
                  <Nav.Link eventKey="link-3">
                    <IconName.FaTag className="mr-2" />
                    Categories
                  </Nav.Link>
                </Row>
                <Row className="flex-column mt-5">
                  <Nav.Link eventKey="link-3">
                    <IconName.FaCog className="mr-2" />
                    Settings
                  </Nav.Link>
                  <Nav.Link eventKey="link-3">
                    <IconName.FaQuestionCircle className="mr-2" />
                    Support
                  </Nav.Link>
                </Row>
              </Nav>
            </Navbar>
          </Col>
          <Col xs={10} className="bg-light"></Col>
        </Row>
      </div>
    </>
  );
}
