import * as React from 'react';
import { Badge } from 'react-bootstrap';
import { useAddBookSlice } from '../../AddBookForm/slice';
import styled from 'styled-components/macro';
import { useDispatch } from 'react-redux';

interface Props {
  fieldId: number;
  realId: string | number;
  firstName: string;
  middleName?: string;
  lastName: string;
  remove: Function;
}

export function AuthorBadge(props: Props) {
  const { actions } = useAddBookSlice();
  const dispatch = useDispatch();

  const removeAuthor = (): void => {
    // this will remove it from the authors field.
    props.remove(props.fieldId);
    // this will remove it from the store.
    dispatch(actions.removeAuthor({ id: props.realId }));
  };
  return (
    <CustomBadge variant="secondary" className="ml-1">
      {`${props.firstName} ${props.middleName ? props.middleName : ''} ${
        props.lastName
      } `}
      <i className="bi bi-x-circle" onClick={removeAuthor}></i>
    </CustomBadge>
  );
}

const CustomBadge = styled(Badge)`
  font-size: 0.6em;
`;
