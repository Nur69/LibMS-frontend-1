/**
 *
 * AuthorsAutoComplete
 *
 */
import * as React from 'react';
import { Form } from 'react-bootstrap';
import { AuthorBadge } from '../AuthorBadge';
import { Author } from './slice/types';
import { useFormContext, Controller } from 'react-hook-form';
import { Typeahead } from 'react-bootstrap-typeahead';

interface Props {}

// Dummy data that will be later replaced by data from the store fetched from the backend
const tempAuthors: Author[] = [
  { id: '12-a', firstName: 'John', middleName: 'Hubert', lastName: 'Doe' },
  { id: '13-x', firstName: 'William', lastName: 'Press' },
];

export const ConnectForm = ({ children }) => {
  const methods = useFormContext();

  return children({ ...methods });
};

export function AuthorsAutoComplete(props: Props) {
  const [authorsState, setAuthorsState] = React.useState([] as Author[]);

  const authorSelected = selected => {
    setAuthorsState(oldArray => [...oldArray, ...selected]);
  };

  return (
    <ConnectForm>
      {methods => (
        <Form.Group>
          <Form.Label htmlFor="author">Author(s)</Form.Label>
          <div className="mb-2">
            {authorsState.map(author => (
              <AuthorBadge
                key={author.id}
                firstName={author.firstName}
                middleName={author.middleName}
                lastName={author.lastName}
              />
            ))}
          </div>
          <Controller
            control={methods.control}
            name="author"
            render={({ field }) => (
              <Typeahead
                {...field}
                id="author"
                isValid={!!methods.formState.errors.author}
                labelKey={option => `${option.firstName} ${option.lastName}`}
                options={tempAuthors}
                onChange={authorSelected} // selected is an array
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {methods.formState.errors['author']?.message}
          </Form.Control.Feedback>
        </Form.Group>
      )}
    </ConnectForm>
  );
}
