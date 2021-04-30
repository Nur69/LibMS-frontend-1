import { SUPPORTED_IMAGE_FORMATS } from 'app/services/validation/schemes/AddBook';
import React from 'react';
import { Form, Image } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';

interface IProps {
  label: string;
  title: string;
  id: string;
  preview: {
    id: string;
    width: string;
  };
}

const ConnectForm = ({ children }) => {
  const methods = useFormContext();

  return children({ ...methods });
};

export function CustomImageInput(props: IProps) {
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
          style={{ width: props.preview.width ? props.preview.width : '100%' }}
          id={props.preview.id}
          aria-label={props.preview.id}
          className="rounded mb-2"
          thumbnail
        />
      );
    }
  };

  return (
    <ConnectForm>
      {methods => (
        <Form.Group>
          <Form.Label htmlFor={props.id}>{props.label}</Form.Label>
          <br></br>
          {showPreloadImage()}
          <Form.File id={props.id} custom>
            <Form.File.Input
              type="file"
              accept="image/x-png,image/jpeg"
              {...methods.register(props.id)}
              onChange={handleImageChange}
              isInvalid={!!methods.formState.errors[props.id]}
            />
            <Form.File.Label data-browse="Upload">{fileName}</Form.File.Label>
            <Form.Control.Feedback type="invalid">
              {methods.formState.errors[props.id]?.message}
            </Form.Control.Feedback>
          </Form.File>
        </Form.Group>
      )}
    </ConnectForm>
  );
}
