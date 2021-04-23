import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Header } from 'app/components/Header';
import { useYupValidationResolver } from 'app/services/validation/resolvers/Resolver';
import { ValidationSchema } from 'app/services/validation/schemes/AddBook';
import { AddBookForm } from './AddBookForm';

export function AddBook() {
  const onSubmit = (data: AddBookForm): void =>
    console.info(JSON.stringify(data));

  const resolver = useYupValidationResolver(ValidationSchema);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver,
  });
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
              <Col className="border-left">
                <Form className="mb-3" onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group>
                    <Form.Label htmlFor="isbn">ISBN</Form.Label>
                    <Form.Control
                      type="text"
                      className="w-75"
                      id="isbn"
                      aria-label="isbn"
                      {...register('isbn')}
                      isInvalid={!!errors.isbn}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.isbn?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label htmlFor="title">Title</Form.Label>
                    <Form.Control
                      type="text"
                      className="w-75"
                      id="title"
                      aria-label="title"
                      aria-describedby="title"
                      {...register('title')}
                      isInvalid={!!errors.title}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.title?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label htmlFor="subtitle">Subtitle</Form.Label>
                    <Form.Control
                      type="text"
                      id="subtitle"
                      className="w-75"
                      {...register('subtitle')}
                      isInvalid={!!errors.subtitle}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.subtitle?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label htmlFor="originTitle">Origin Title</Form.Label>
                    <Form.Control
                      type="text"
                      id="originTitle"
                      className="w-75"
                      {...register('originTitle')}
                      isInvalid={!!errors.originTitle}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.originTitle?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form>
              </Col>
              <Col className="border-left">
                <Form className="mb-3" onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group>
                    <Form.Label htmlFor="author">Author</Form.Label>
                    <Form.Control
                      type="text"
                      className="w-75"
                      id="author"
                      aria-describedby="authorHelp"
                      aria-label="author"
                      {...register('author')}
                      isInvalid={!!errors.author}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.author?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label htmlFor="publisher">Publisher</Form.Label>
                    <Form.Control
                      type="text"
                      className="w-75"
                      id="publisher"
                      aria-label="publisher"
                      {...register('publisher')}
                      isInvalid={!!errors.publisher}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.publisher?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label htmlFor="publishedDate">
                      Published Date
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="DD/MM/YYYY"
                      className="w-75"
                      id="publishedDate"
                      aria-label="publishedDate"
                      {...register('publishedDate')}
                      isInvalid={!!errors.publishedDate}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.publishedDate?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <button
                    type="submit"
                    className="btn btn-primary w-75 mt-4"
                    data-testid="addBook-button"
                  >
                    Add Book
                  </button>
                </Form>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}
