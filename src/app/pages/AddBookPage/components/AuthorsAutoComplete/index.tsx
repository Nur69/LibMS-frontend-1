/**
 *
 * AuthorsAutoComplete
 *
 */
import * as React from 'react';
import { Form } from 'react-bootstrap';
import { AuthorBadge } from '../AuthorBadge';
import { Author } from './slice/types';
import { useFormContext } from 'react-hook-form';

interface Props {}

const tempAuthors: Author[] = [
  { id: '12-a', firstName: 'John', middleName: 'Hubert', lastName: 'Doe' },
  { id: '13-x', firstName: 'William', lastName: 'Press' },
];

export const ConnectForm = ({ children }) => {
  const methods = useFormContext();

  return children({ ...methods });
};

export function AuthorsAutoComplete(props: Props) {
  return (
    <ConnectForm>
      {methods => (
        <Form.Group>
          <Form.Label htmlFor="author">Author(s)</Form.Label>
          <div className="mb-2">
            {tempAuthors.map(author => (
              <AuthorBadge
                key={author.id}
                firstName={author.firstName}
                middleName={author.middleName}
                lastName={author.lastName}
              />
            ))}
          </div>
          <Form.Control
            type="text"
            id="author"
            aria-describedby="authorHelp"
            aria-label="author"
            {...methods.register('author')}
            isInvalid={!!methods.formState.errors.author}
          />
          <Form.Control.Feedback type="invalid">
            {methods.formState.errors['author']?.message}
          </Form.Control.Feedback>
        </Form.Group>
      )}
    </ConnectForm>
  );
}
