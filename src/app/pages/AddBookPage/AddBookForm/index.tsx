import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Button, Col, Form, Row, Image } from 'react-bootstrap';
import { useYupValidationResolver } from 'app/services/validation/resolvers/Resolver';
import {
  SUPPORTED_IMAGE_FORMATS,
  ValidationSchema,
} from 'app/services/validation/schemes/AddBook';
import { AddBookForm } from './AddBookForm';
import { CustomInputField } from '../components/CustomInputField';

export function AddBook() {
  const initialState = {
    file: {} as File,
    fileName: 'Select an image',
    imagePreview: false,
    imagePreviewUrl: '',
  };
  const [state, setState] = React.useState(initialState);
  const { fileName } = state;

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    let file: File = (target.files as FileList)[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setState({
        file: file,
        fileName: file.name,
        imagePreview: SUPPORTED_IMAGE_FORMATS.includes(file.type),
        imagePreviewUrl: result,
      });
    };
    reader.readAsDataURL(file);
  };

  const showPreloadImage = () => {
    const { imagePreview, imagePreviewUrl } = state;
    if (imagePreview) {
      return (
        <Image
          src={imagePreviewUrl}
          style={{ width: '100%' }}
          id="image-preview"
          aria-label="image-preview"
          className="rounded mb-2"
          thumbnail
        />
      );
    }
  };

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
            <Form.Group>
              <Form.Label>{'Book Cover'}</Form.Label>
              <br></br>
              {showPreloadImage()}
              <Form.File id="image-upload" custom>
                <Form.File.Input
                  type="file"
                  accept="image/x-png,image/jpeg"
                  {...methods.register('bookCover')}
                  onChange={handleImageChange}
                  isInvalid={!!methods.formState.errors.bookCover}
                />
                <Form.File.Label data-browse="Upload">
                  {fileName}
                </Form.File.Label>
                <Form.Control.Feedback type="invalid">
                  {methods.formState.errors.bookCover?.message}
                </Form.Control.Feedback>
              </Form.File>
            </Form.Group>
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
