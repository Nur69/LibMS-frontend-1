import { Sidebar } from 'app/components/Sidebar';
import {
  Row,
  Col,
  Navbar,
  Nav,
  Form,
  Dropdown,
  Badge,
  Button,
} from 'react-bootstrap';
import * as IconName from 'react-icons/fa';
import { BooksList } from './BooksList';

export function BooksPage() {
  return (
    <>
      <Row>
        <Col xs={2} className="d-flex min-vh-100 justify-content-center">
          <Sidebar></Sidebar>
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
          <Row className="align-items-center">
            <Form>
              <Button
                className="w-100 ml-5"
                style={{ backgroundColor: '#73a47' }}
              >
                Remind
              </Button>{' '}
            </Form>
          </Row>
          <Row className="h-50 align-items-center ml-4">
            <BooksList></BooksList>
          </Row>
        </Col>
      </Row>
    </>
  );
}
