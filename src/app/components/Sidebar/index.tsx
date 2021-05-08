import React, { memo } from 'react';
import { Col, Nav, Navbar, Row } from 'react-bootstrap';
import { IconType } from 'react-icons/lib';

interface Item {
  name: string;
  link: string;
  icon: IconType;
}

interface Props {
  navItemsTop: Item[];
  imgSource: string;
  navItemsBottom: Item[];
}

export const Sidebar = memo(
  ({ navItemsTop, navItemsBottom, imgSource }: Props) => {
    return (
      <>
        <div className="min-vh-100">
          <Row>
            <Col xs={2} className="d-flex min-vh-100 justify-content-center">
              <Navbar variant="light">
                <Nav className="flex-column mb-auto">
                  <Row className="mb-5">
                    <img src={imgSource} alt="" width={200} height={101} />
                  </Row>
                  <Row className="flex-column mt-5 mb-5">
                    {navItemsTop.map(navigate => (
                      <Nav.Link href={navigate.link}>
                        <navigate.icon className="mr-2" />
                        {navigate.name}
                      </Nav.Link>
                    ))}
                  </Row>
                  <Row className="flex-column mt-5">
                    {navItemsBottom.map(navigate => (
                      <Nav.Link href={navigate.link}>
                        <navigate.icon className="mr-2" />
                        {navigate.name}
                      </Nav.Link>
                    ))}
                  </Row>
                </Nav>
              </Navbar>
            </Col>
            <Col xs={10} className="bg-light"></Col>
          </Row>
        </div>
      </>
    );
  },
);
