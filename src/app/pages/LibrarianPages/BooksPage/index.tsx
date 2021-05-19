import React from 'react';
import { Row } from 'react-bootstrap';
import { BooksList } from './BooksList';

export function BooksPage() {
  return (
    <Row className="justify-content-center h-75 w-100">
      <BooksList />
    </Row>
  );
}
