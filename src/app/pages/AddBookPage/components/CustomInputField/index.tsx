import { RequiredFormLabel } from 'app/components/RequiredFormLabel';
import { Form } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';

const ConnectForm = ({ children }) => {
  const methods = useFormContext();

  return children({ ...methods });
};

interface IProps {
  required?;
  title: string;
  type: string;
  htmlFor: string;
  id: string;
  ariaLabel: string;
}

export function CustomInputField(props: IProps) {
  return (
    <ConnectForm>
      {methods => (
        <Form.Group>
          {props.required ? (
            <RequiredFormLabel htmlFor={props.htmlFor}>
              {props.title}
            </RequiredFormLabel>
          ) : (
            <Form.Label htmlFor={props.htmlFor}>{props.title}</Form.Label>
          )}
          <Form.Control
            type={props.type}
            id={props.id}
            aria-label={props.ariaLabel}
            {...methods.register(props.id)}
            isInvalid={!!methods.formState.errors[props.id]}
          />
          <Form.Control.Feedback type="invalid">
            {methods.formState.errors[props.id]?.message}
          </Form.Control.Feedback>
        </Form.Group>
      )}
    </ConnectForm>
  );
}
