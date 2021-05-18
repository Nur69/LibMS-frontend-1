/**
 *
 * BookDescPage
 *
 */
import { ASSETS_ENDPOINTS } from 'app/configs/endpoints';
import * as React from 'react';
import { Button, Col, Image, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import styled from 'styled-components/macro';
import { selectBookByISBN } from '../BooksPage/BooksList/slice/selectors';

interface Props {}

export function BookDescPage(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let { id } = useParams<{ id: string }>();

  const selectedBook = useSelector(selectBookByISBN(id))[0];
  return (
    <Row className="w-100 ml-4">
      <Col md="auto">
        <Image
          height={346}
          width={224}
          src={`${ASSETS_ENDPOINTS.images}/${selectedBook.image.name}`}
          thumbnail
        />
      </Col>
      <Col md={8}>
        <BookTitle className="font-weight-light">
          {selectedBook.title}
        </BookTitle>
        <div>{selectedBook.subtitle}</div>
        {/* king? */}
        <div className="mt-4">
          {selectedBook.authors
            .slice(0, selectedBook.authors.length - 1)
            .map(a => a.fullName)
            .join(', ')}
          {selectedBook.authors.length > 1 ? ` and ` : ` `}
          {selectedBook.authors[selectedBook.authors.length - 1].fullName}
        </div>
        <div className="mt-4">
          <div>Publisher: {selectedBook.publisher}</div>
          <div>Date: {new Date(selectedBook.publishedDate).toDateString()}</div>
          <div>ISBN: {selectedBook.isbn}</div>
          <div>Pages: {selectedBook.pageCount}</div>
        </div>
      </Col>
      <Col md="auto">
        <Button className="mr-1">Edit</Button>
        <Button variant="danger">Delete</Button>
      </Col>
    </Row>
  );
}

const BookTitle = styled.div`
  font-size: 2em;
`;
