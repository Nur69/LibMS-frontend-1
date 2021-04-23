import * as React from 'react';
import { Header } from 'app/components/Header';
import { Footer } from 'app/components/Footer';
import { Row } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { AddBook } from './AddBookForm/index';

export function AddBookPage() {
  return (
    <>
      <Header title="Book Adding Form" navItems={[]} account={false} />
      <div
        className="d-flex flex-column min-vh-100"
        style={{ backgroundColor: '#F6F8FB' }}
      >
        <Container className="text-left wrapper flex-grow-1">
          <div
            className="d-block mt-5 mb-5 font-weight-light"
            style={{ fontSize: '2em' }}
          >
            Add a Book
          </div>
          <div className="d-block" style={{ fontSize: '1.232em' }}>
            <Row>
              <AddBook />
            </Row>
          </div>
        </Container>
        <Footer />
      </div>
    </>
  );
}
