import * as React from 'react';
import Form from 'react-bootstrap/Form';
export function LoginForm() {
  return (
    <Form className="mb-3" data-testid="login-form">
      <Form.Group>
        <Form.Label htmlFor="emailAddr">Email address</Form.Label>
        <Form.Control type="email" className="w-75" id="emailAddr" />
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control type="password" className="w-75" id="password" />
      </Form.Group>
      <button type="submit" className="btn btn-primary w-75">
        Submit
      </button>
    </Form>
  );
}
