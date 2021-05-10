import { CustomImageInput } from 'app/components/CustomImageInput';
import { selectAccessToken } from 'app/pages/LoginPage/LoginForm/slice/selectors';
import { useYupValidationResolver } from 'app/services/validation/resolvers/Resolver';
import { ValidationSchema } from 'app/services/validation/schemes/AddBook';
import React from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AuthorsAutoComplete } from '../components/AuthorsAutoComplete';
import { CustomInputField } from '../components/CustomInputField';
import { AddBookForm } from './AddBookForm';
import { useAddBookSlice } from './slice';
import {
  selectErrorMessage,
  selectIsError,
  selectIsSuccess,
  selectSuccessMessage,
} from './slice/selectors';

export function AddBook() {
  const { actions } = useAddBookSlice();
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);

  const resolver = useYupValidationResolver(ValidationSchema);
  const methods = useForm<any>({
    resolver,
  });

  const renameFile = (file: File) => {
    const blob = file.slice(0, file.size, file.type);
    const newName = `${file.name.split('.')[0]}-${file.lastModified}.${
      file.name.split('.')[1]
    }`;
    return new File([blob], newName, { type: file.type });
  };

  const onSubmit = (data: AddBookForm): void => {
    let publicationDate = new Date(data.publicationDate).toISOString();
    let image = renameFile(data.image[0]);

    dispatch(
      actions.requestAddBook({
        ...data,
        image,
        publicationDate,
        accessToken,
      }),
    );
  };

  const successMessage = useSelector(selectSuccessMessage);
  const errorMessage = useSelector(selectErrorMessage);
  const isError = useSelector(selectIsError);
  const isSuccess = useSelector(selectIsSuccess);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showAlert, setShowAlert] = React.useState(true);

  const errorAlert = (
    <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
      <p>{errorMessage}</p>
    </Alert>
  );

  const successAlert = (
    <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
      <p>{successMessage}</p>
    </Alert>
  );
  return (
    <FormProvider {...methods}>
      {!!isError && errorAlert}
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

            <AuthorsAutoComplete />

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
              title="Number of Pages"
              id="pageCount"
              type="text"
              htmlFor="pageCount"
              ariaLabel="pageCount"
            />

            <CustomInputField
              title="Publisher"
              id="publisher"
              type="text"
              htmlFor="publisher"
              ariaLabel="publisher"
            />

            <CustomInputField
              title="Publication Date"
              id="publicationDate"
              type="text"
              htmlFor="publicationDate"
              ariaLabel="publicationDate"
            />
          </Col>
          <Col xs={6} md={4}>
            <CustomImageInput
              label="Book Cover"
              title="Select a file"
              id="image"
              preview={{ id: 'image-preview', width: '100%' }}
            ></CustomImageInput>
            {!!isSuccess && successAlert}
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
