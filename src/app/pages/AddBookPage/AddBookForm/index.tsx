import { useForm, FormProvider } from 'react-hook-form';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useYupValidationResolver } from 'app/services/validation/resolvers/Resolver';
import { ValidationSchema } from 'app/services/validation/schemes/AddBook';
import { AddBookForm } from './AddBookForm';
import { CustomInputField } from '../components/CustomInputField';
import { CustomImageInput } from 'app/components/CustomImageInput';
import { useAddBookSlice } from './slice';
import { useDispatch } from 'react-redux';
import { AuthorsAutoComplete } from '../components/AuthorsAutoComplete';

export function AddBook() {
  const { actions } = useAddBookSlice();
  const dispatch = useDispatch();

  const resolver = useYupValidationResolver(ValidationSchema);
  const methods = useForm<any>({
    resolver,
  });

  const onSubmit = (data: AddBookForm): void => {
    let publicationDate = new Date(data.publicationDate).toISOString();
    let image = data.image[0];
    console.log('data: ', {
      ...data,
      image,
      publicationDate,
    });
    dispatch(
      actions.requestAddBook({
        ...data,
        image,
        publicationDate,
      }),
    );
  };

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
