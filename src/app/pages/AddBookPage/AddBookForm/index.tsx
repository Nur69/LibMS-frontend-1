import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useYupValidationResolver } from 'app/services/validation/resolvers/Resolver';
import { ValidationSchema } from 'app/services/validation/schemes/AddBook';
import { AddBookForm } from './AddBookForm';
import { CustomInputField } from '../components/CustomInputField';
import { CustomImageInput } from 'app/components/CustomImageInput';

export function AddBook() {
  const onSubmit = (data: AddBookForm): void =>
    console.info(JSON.stringify(data));

  const resolver = useYupValidationResolver(ValidationSchema);
  const methods = useForm<any>({
    resolver,
  });
  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
        <Row>
          <Col xs={6} md={6}>
            <CustomInputField
              title="ISBN"
              id="isbn"
              type="text"
              htmlFor="isbn"
              ariaLabel="isbn"
            />

            <CustomInputField
              title="Title"
              id="title"
              type="text"
              htmlFor="title"
              ariaLabel="title"
            />

            <CustomInputField
              title="Subtitle"
              id="subtitle"
              type="text"
              htmlFor="subtitle"
              ariaLabel="subtitle"
            />

            <CustomInputField
              title="Original Title"
              id="originTitle"
              type="text"
              htmlFor="originTitle"
              ariaLabel="originTitle"
            />

            <CustomInputField
              title="Publisher"
              id="publisher"
              type="text"
              htmlFor="publisher"
              ariaLabel="publisher"
            />

            <CustomInputField
              title="Published Date"
              id="publishedDate"
              type="text"
              htmlFor="publishedDate"
              ariaLabel="publishedDate"
            />
          </Col>
          <Col xs={6} md={4}>
            <CustomImageInput
              label="Book Cover"
              title="Select a file"
              id="bookCover"
              preview={{ id: 'image-preview', width: '100%' }}
            ></CustomImageInput>
            <Button
              className="float-right"
              type="submit"
              data-testid="addBook-button"
            >
              Add Book
            </Button>
          </Col>
        </Row>
      </Form>
    </FormProvider>
  );
}
