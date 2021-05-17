import { RequiredFormLabel } from 'app/components/RequiredFormLabel';
import { SUPPORTED_IMAGE_FORMATS } from 'app/services/validation/schemes/AddBook';
import React, { useEffect } from 'react';
import { Form, Image } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';
interface ImageProps {
  imagePreview: boolean;
  imagePreviewUrl: string;
  id: string;
  width: string;
  isSubmitted: boolean;
}
interface IProps {
  required?;
  label: string;
  title: string;
  id: string;
  preview: {
    id: string;
    width: string;
  };
}

export function ShowPreloadImage(props: ImageProps) {
  if (props.imagePreview) {
    return (
      <Image
        src={props.imagePreviewUrl}
        style={{ width: props.width ? props.width : '100%' }}
        id={props.id}
        aria-label={props.id}
        className="rounded mb-2"
        thumbnail
      />
    );
  }
  return <></>;
}

export function CustomImageInput(props: IProps) {
  const { formState, register } = useFormContext();

  const initialState = {
    file: {} as File,
    fileName: 'Select an image',
    imagePreview: false,
    imagePreviewUrl: '',
  };

  const [state, setState] = React.useState(initialState);

  useEffect(() => {
    if (formState.isSubmitSuccessful) setState(initialState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState.isSubmitSuccessful]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    let file: File = (target.files as FileList)[0];
    if (file) {
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
    } else {
      // Reset store if user cancels action
      setState(initialState);
    }
  };

  return (
    <Form.Group>
      {props.required ? (
        <RequiredFormLabel htmlFor={props.id}>{props.label}</RequiredFormLabel>
      ) : (
        <Form.Label htmlFor={props.id}>{props.label}</Form.Label>
      )}
      <br></br>
      <ShowPreloadImage
        imagePreview={state.imagePreview}
        imagePreviewUrl={state.imagePreviewUrl}
        isSubmitted={formState.isSubmitted}
        {...props.preview}
      />
      <Form.File id={props.id} custom>
        <Form.File.Input
          type="file"
          accept="image/x-png,image/jpeg"
          {...register(props.id)}
          onChange={handleImageChange}
          isInvalid={!!formState.errors[props.id]}
        />
        <Form.File.Label data-browse="Upload">{state.fileName}</Form.File.Label>
        <Form.Control.Feedback type="invalid">
          {formState.errors[props.id]?.message}
        </Form.Control.Feedback>
      </Form.File>
    </Form.Group>
  );
}
