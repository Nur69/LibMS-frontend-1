import { Sidebar } from 'app/components/Sidebar';
import { Col, Row } from 'react-bootstrap';

export function DashboardPage() {
  return (
    <>
      <Row>
        <Col xs={2} className="d-flex min-vh-100 justify-content-center">
          <Sidebar></Sidebar>
        </Col>
        <Col xs={10} className="bg-light"></Col>
      </Row>
    </>
  );
}
