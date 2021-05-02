/**
 *
 * AuthorsAutoComplete
 *
 */
import * as React from 'react';
import { Form } from 'react-bootstrap';
import { AuthorBadge } from '../AuthorBadge';
import { Author } from './slice/types';
import { useFormContext, Controller, useFieldArray } from 'react-hook-form';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthors } from '../../AddBookForm/slice/selectors';
import { useAddBookSlice } from '../../AddBookForm/slice';

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
  const authors = useSelector(selectAuthors);
  const { actions } = useAddBookSlice();
  const dispatch = useDispatch();

  // this a field array
  // why am I doing this? bascially this is needed so that yup can validate.
  // go to the validation scheme and you'll find the authors validation rule.
  // when adding an author it will be added in two places: the AddBookSlice and the authors field
  // I'm storing the authors in the slice so that they are rendered and deleted from the AuthorsBadge component

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { fields, append, remove } = useFieldArray({
    name: 'authors',
    control: useFormContext().control,
  });

  // to clear field after author addition
  const ref = React.useRef<any>(null);

  const authorSelected = (list: any[]) => {
    dispatch(actions.addAuthor({ list }));
    // this will populate that field array (i.e. authors)
    append({ firstName: list[0].firstName, lastName: list[0].lastName });
    // clear field once the author is added
    ref.current.clear();
  };

  return (
    <ConnectForm>
      {methods => (
        <Form.Group>
          <Form.Label htmlFor="author">Author(s)</Form.Label>
          <div className="mb-2">
            {authors.map((author, i) => (
              <AuthorBadge
                key={author.id}
                firstName={author.firstName}
                lastName={author.lastName}
                fieldId={i}
                realId={author.id}
                remove={remove}
              />
            ))}
          </div>
          {/* Here I'm allowing RHF to control Typeahead */}
          <Controller
            control={methods.control}
            name="author"
            render={({ field }) => (
              <Typeahead
                {...field}
                ref={ref}
                id="author"
                isInvalid={!!methods.formState.errors.authors}
                labelKey={option => `${option.firstName} ${option.lastName}`}
                options={tempAuthors}
                onChange={authorSelected} // selected is an array
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {/*for some reason this is not rendering despite being in the DOM*/}
            {methods.formState.errors['authors']?.message}
          </Form.Control.Feedback>
          {/* workaround */}
          <small className="text-danger">
            {methods.formState.errors['authors']?.message}
          </small>
        </Form.Group>
      )}
    </ConnectForm>
  );
}
