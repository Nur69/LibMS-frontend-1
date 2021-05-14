/**
 *
 * BookDescPage
 *
 */
import * as React from 'react';
import { Button, Col, Collapse, Image, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import styled from 'styled-components/macro';

interface Props {}

export function BookDescPage(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let { id } = useParams<{ id: string }>();

  const maxChar = 150;
  const [showText, setShowText] = React.useState(false);

  const book = {
    id: 'a877f456-3284-42d1-b426-4c5f44eca561',
    isbn: '0321815734',
    title: 'Software Architecture in Practice',
    subtitle: '(SEI Series in Software Engineering), 3rd Edition',
    authors: [
      {
        fullName: 'Len Bass',
        id: '2131',
      },
      {
        fullName: 'Paul Clements',
        id: '2151',
      },
      {
        fullName: 'Rick Kazman',
        id: '2152',
      },
    ],
    image: {
      name: 'cover.jpg',
      url: 'https://i.imgur.com/FpA7gcB.jpg',
      size: 400,
      mimeType: 'image/jpeg',
      id: '2131',
    },
    publisher: 'Addison-Wesley Professional',
    publishedDate: new Date(2012, 9, 25),
    pageCount: 624,
    overview:
      'The award-winning and highly influential Software Architecture in Practice, Third Edition, has been substantially revised to reflect the latest developments in the field. In a real-world setting, the book once again introduces the concepts and best practices of software architecture―how a software system is structured and how that system’s elements are meant to interact. Distinct from the details of implementation, algorithm, and data representation, an architecture holds the key to achieving system quality, is a reusable asset that can be applied to subsequent systems, and is crucial to a software organization’s business strategy.',
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getBookFromStore = (id: number): any => {};

  return (
    <Row>
      <Col md="auto">
        <Image height={346} width={224} src={book.image.url} thumbnail />
      </Col>
      <Col md={4}>
        <BookTitle className="font-weight-light">{book.title}</BookTitle>
        <div>{book.subtitle}</div>
        {/* king? */}
        <div className="mt-4">
          {book.authors
            .slice(0, book.authors.length - 1)
            .map(a => a.fullName)
            .join(', ')}
          {` and ${book.authors[book.authors.length - 1].fullName}`}
        </div>
        <div>
          <p className="text-muted mt-4">
            {book.overview.slice(0, maxChar)}
            {/** The warning is caused by react-boostrap library */}
            <Collapse in={showText}>
              <p>{book.overview.slice(maxChar, book.overview.length - 1)}</p>
            </Collapse>
          </p>
        </div>
        <ReadMoreButton
          onClick={() => {
            setShowText(!showText);
            console.log(showText);
          }}
        >
          See more
        </ReadMoreButton>
        <div className="mt-4">
          <div>Publisher: {book.publisher}</div>
          <div>Date: {book.publishedDate.toDateString()}</div>
          <div>ISBN: {book.isbn}</div>
          <div>Pages: {book.pageCount}</div>
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
const ReadMoreButton = styled.button`
  background-color: transparent;
  border-color: transparent;
  color: #007bff;
`;
