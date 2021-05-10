/**
 *
 * AuthorsAutoComplete
 *
 */
import { selectAccessToken } from 'app/pages/LoginPage/LoginForm/slice/selectors';
import * as React from 'react';
import { ChangeEvent } from 'react';
import { Form } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AuthorBadge } from '../AuthorBadge';
import { useAddBookAuthorsSlice } from './slice';
import { selectAuthors } from './slice/selectors';

interface Props {}

let NEW_AUTHOR_ID = 0;

export const ConnectForm = ({ children }) => {
  const methods = useFormContext();

  return children({ ...methods });
};

export function AuthorsAutoComplete(props: Props) {
  const dispatch = useDispatch();
  const { actions } = useAddBookAuthorsSlice();

  const accessToken = useSelector(selectAccessToken);
  const authorsList = useSelector(selectAuthors);

  React.useEffect(() => {
    dispatch(actions.requestAuthors({ accessToken }));
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { fields, append, remove } = useFieldArray({
    name: 'authors',
    control: useFormContext().control,
  });

  // to clear field after author addition
  const ref = React.useRef<any>(null);

  const authorSelected = (list: any[]) => {
    // this will populate that field array (i.e. 'authors' field)
    append({
      id: list[0].id,
      name: list[0].name,
    });
    // clear field once the author is added
    ref.current.clear();
  };

  // method for adding a new author not in the list
  const addNewAuthor = (e: Event) => {
    const t = e as KeyboardEvent;
    if (t.key === 'Enter') {
      const v = ((t as unknown) as ChangeEvent<HTMLInputElement>).target.value;
      NEW_AUTHOR_ID += 1;
      append({
        id: NEW_AUTHOR_ID,
        name: v,
      });
      ref.current.clear();
    }
  };

  return (
    <ConnectForm>
      {methods => (
        <Form.Group>
          <Form.Label htmlFor="author">Author(s)</Form.Label>
          <div className="mb-2">
            {methods.getValues('authors')?.map((author, i) => (
              <AuthorBadge
                key={i}
                name={author.name}
                fieldId={i}
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
                labelKey={option => option.name}
                options={authorsList}
                onChange={authorSelected} // selected is an array
                onKeyDown={addNewAuthor}
                minLength={2}
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
