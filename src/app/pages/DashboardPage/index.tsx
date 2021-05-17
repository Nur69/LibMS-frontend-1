import { Sidebar } from 'app/components/Sidebar';
import { Badge, Col, Dropdown, Form, Nav, Navbar, Row } from 'react-bootstrap';
import * as IconName from 'react-icons/fa';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BooksPage } from '../BooksPage/Loadable';
import { ReservationsPage } from '../ReservationsPage';

export function DashboardPage() {
  return (
    <Router>
      <Row>
        <Col xs={2} className="d-flex min-vh-100 justify-content-center">
          <Sidebar />
        </Col>
        <Col xs={10} className="bg-light">
          <Row className="h-25">
            <Navbar bg="light" className=" w-100 mr-5">
              <Col xs={4} className="ml-5">
                <Nav>
                  <Form.Group>
                    <Form.Control
                      className="w-100"
                      type="text"
                      placeholder="Search"
                    />
                  </Form.Group>
                </Nav>
              </Col>
              <Col xs={8} className="d-flex flex-row-reverse mr-5">
                <Dropdown className="mr-5">
                  <Dropdown.Toggle variant={'#73a47'} id="dropdown-basic">
                    Bechir Jamoussi
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ backgroundColor: '#73a47' }}>
                    <Dropdown.Item>Profile</Dropdown.Item>
                    <Dropdown.Item>Security</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>Security</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="ml-5 ">
                  <Dropdown.Toggle variant={'#73a47'} id="dropdown-basic">
                    <IconName.FaBell />
                    <Badge variant="danger">9</Badge>
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ backgroundColor: '#73a47' }}>
                    <Dropdown.Item>Reservation expires in 2 days</Dropdown.Item>
                    <Dropdown.Item>Reservation expires in 1 day</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Navbar>
          </Row>
          {/** Sidebar elements will be rendered here */}
          <Row>
            <Col>
              <Switch>
                <Route
                  path="/dashboard/books"
                  exact
                  render={() => <BooksPage />}
                />
                <Route
                  path="/dashboard/reservations"
                  exact
                  render={() => <ReservationsPage />}
                />
                
              </Switch>
            </Col>
          </Row>
        </Col>
      </Row>
    </Router>
  );
}
