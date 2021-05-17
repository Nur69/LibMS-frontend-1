import { Col, Row } from 'react-bootstrap';
import { BooksList } from './BooksList';

export function BooksPage() {
  return (
    <Row className="h-50 align-items-center ml-4">
      <Col>
        <BooksList />
      </Col>
    </Row>
  );
}
