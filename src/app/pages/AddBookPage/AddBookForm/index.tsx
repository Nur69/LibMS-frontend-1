import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Col, Form, Row, Image } from 'react-bootstrap';
import { useYupValidationResolver } from 'app/services/validation/resolvers/Resolver';
import {
  SUPPORTED_IMAGE_FORMATS,
  ValidationSchema,
} from 'app/services/validation/schemes/AddBook';
import { AddBookForm } from './AddBookForm';

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
    console.log('yah benek');
    return <></>;
  };

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
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col xs={6} md={6}>
            <Form.Group>
              <Form.Label htmlFor="isbn">ISBN</Form.Label>
              <Form.Control
                type="text"
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
                {...register('originTitle')}
                isInvalid={!!errors.originTitle}
              />
              <Form.Control.Feedback type="invalid">
                {errors.originTitle?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="author">Author</Form.Label>
              <Form.Control
                type="text"
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
              <Form.Label htmlFor="publishedDate">Published Date</Form.Label>
              <Form.Control
                type="text"
                placeholder="DD/MM/YYYY"
                id="publishedDate"
                aria-label="publishedDate"
                {...register('publishedDate')}
                isInvalid={!!errors.publishedDate}
              />

              <Form.Control.Feedback type="invalid">
                {errors.publishedDate?.message}
              </Form.Control.Feedback>
            </Form.Group>
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
                  {...register('bookCover')}
                  onChange={handleImageChange}
                  isInvalid={!!errors.bookCover}
                />
                <Form.File.Label data-browse="Upload">
                  {fileName}
                </Form.File.Label>
                <Form.Control.Feedback type="invalid">
                  {errors.bookCover?.message}
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
    </>
  );
}
