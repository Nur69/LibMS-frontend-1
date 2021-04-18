import * as React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useUserSlice } from './slice';

export function LoginForm() {
  interface LoginForm {
    email: string;
    password: string;
  }

  const { actions } = useUserSlice();
  const dispatch = useDispatch();

  const onSubmit = (data: LoginForm) => {
    console.log(JSON.stringify(data));
    dispatch(actions.requestLogin({ ...data }));
  };
  const { register, handleSubmit } = useForm();

  return (
    <Form
      className="mb-3"
      data-testid="login-form"
      onSubmit={handleSubmit(onSubmit)}
    >
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
    </Form>
  );
}
