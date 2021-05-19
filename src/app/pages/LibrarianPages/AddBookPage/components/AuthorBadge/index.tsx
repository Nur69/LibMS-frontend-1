import * as React from 'react';
import { Badge } from 'react-bootstrap';
import styled from 'styled-components/macro';

interface Props {
  fieldId: number;
  name: string;
  remove: Function;
}

export function AuthorBadge(props: Props) {
  const removeAuthor = (): void => {
    // this will remove it from the authors field.
    props.remove(props.fieldId);
  };
  return (
    <CustomBadge variant="secondary" className="ml-1">
      {props.name} <i className="bi bi-x-circle" onClick={removeAuthor}></i>
    </CustomBadge>
  );
}

const CustomBadge = styled(Badge)`
  font-size: 0.6em;
`;
