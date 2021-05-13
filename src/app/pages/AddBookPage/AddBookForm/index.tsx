import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { CustomImageInput } from 'app/components/CustomImageInput';
import {
  selectAccessToken,
  selectErrorMessage,
  selectIsError,
  selectIsSuccess,
} from 'app/pages/LoginPage/LoginForm/slice/selectors';
import { Book } from 'app/services/validation/schemes/Book';
import React, { useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AuthorsAutoComplete } from '../components/AuthorsAutoComplete';
import { CustomInputField } from '../components/CustomInputField';
import { AddBookForm } from './AddBookForm';
import { useAddBookSlice } from './slice';
import { selectSuccessMessage } from './slice/selectors';

interface IProps {}

export function AddBook(props: IProps) {
  const [showAlert, setShowAlert] = useState(true);

  const { actions } = useAddBookSlice();
  const dispatch = useDispatch();

  const successMessage = useSelector(selectSuccessMessage);
  const errorMessage = useSelector(selectErrorMessage);
  const isError = useSelector(selectIsError);
  const isSuccess = useSelector(selectIsSuccess);
  const accessToken = useSelector(selectAccessToken);

  // const resolver = useYupValidationResolver(ValidationSchema);
  const resolver = classValidatorResolver(Book);
  const methods = useForm<Book>({ resolver });

  const onSubmit = (data: AddBookForm, event): void => {
    let publicationDate = new Date(data.publicationDate).toISOString();
    dispatch(
      actions.requestAddBook({
        ...data,
        image: data.image[0],
        publicationDate,
        accessToken,
      }),
    );
    setShowAlert(true);
    event.target.reset();
  };

  function AlertDismissible() {
    if (isError && showAlert) {
      return (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          <Alert.Heading>{errorMessage}</Alert.Heading>
        </Alert>
      );
    } else if (isSuccess && showAlert) {
      return (
        <Alert
          variant="success"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          <Alert.Heading>{successMessage}</Alert.Heading>
        </Alert>
      );
    }
    return null;
  }

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
        <AlertDismissible />
        <Row>
          <Col xs={6} md={6}>
            <CustomInputField
              required
              title="ISBN"
              id="isbn"
              type="text"
              htmlFor="isbn"
              ariaLabel="isbn"
            />

            <CustomInputField
              required
              title="Title"
              id="title"
              type="text"
              htmlFor="title"
              ariaLabel="title"
            />

            <AuthorsAutoComplete required />

            <CustomInputField
              title="Subtitle"
              id="subtitle"
              type="text"
              htmlFor="subtitle"
              ariaLabel="subtitle"
            />

            <CustomInputField
              title="Original Title"
              id="originalTitle"
              type="text"
              htmlFor="originalTitle"
              ariaLabel="originalTitle"
            />

            <CustomInputField
              required
              title="Number of Pages"
              id="pageCount"
              type="text"
              htmlFor="pageCount"
              ariaLabel="pageCount"
            />

            <CustomInputField
              required
              title="Publisher"
              id="publisher"
              type="text"
              htmlFor="publisher"
              ariaLabel="publisher"
            />

            <CustomInputField
              required
              title="Publication Date"
              id="publicationDate"
              type="text"
              htmlFor="publicationDate"
              ariaLabel="publicationDate"
            />
          </Col>
          <Col xs={6} md={4}>
            <CustomImageInput
              required
              label="Book Cover"
              title="Select a file"
              id="image"
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
