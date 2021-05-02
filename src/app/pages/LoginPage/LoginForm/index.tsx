import * as React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { useUserSlice } from './slice';
import {
  selectIsFetching,
  selectIsError,
  selectErrorMessage,
  selectIsSuccess,
} from './slice/selectors';

export function LoginForm() {
  interface LoginForm {
    email: string;
    password: string;
  }

  const { actions } = useUserSlice();
  const dispatch = useDispatch();

  const onSubmit = (data: LoginForm) => {
    dispatch(actions.requestLogin({ ...data }));
  };
  const { register, handleSubmit } = useForm();

  // Could use this for button spinner
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isFetching = useSelector(selectIsFetching);
  const isError = useSelector(selectIsError);
  const errorMessage = useSelector(selectErrorMessage);
  const isSuccess = useSelector(selectIsSuccess);

  // Local state for the alert

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showAlert, setShowAlert] = React.useState(true);

  const alert = (
    <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
      <p>{errorMessage}</p>
    </Alert>
  );

  return (
    <Form
      className="mb-3"
      data-testid="login-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      {!!isError && alert}
      <Form.Group>
        <Form.Label htmlFor="emailAddr">Email address</Form.Label>
        <Form.Control
          type="email"
          className="w-75"
          id="emailAddr"
          {...register('email')}
        />
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control
          type="password"
          className="w-75"
          id="password"
          {...register('password')}
        />
      </Form.Group>
      <Button type="submit" className="w-75">
        Submit
      </Button>
      {!!isSuccess && <Redirect to="/user" />}
    </Form>
  );
}
