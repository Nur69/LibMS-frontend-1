import * as React from 'react';
import { Badge } from 'react-bootstrap';
import styled from 'styled-components/macro';

interface Props {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export function AuthorBadge(props: Props) {
  return (
    <CustomBadge variant="secondary" className="ml-1">
      {`${props.firstName} ${props.middleName ? props.middleName : ''} ${
        props.lastName
      } `}
      <i className="bi bi-x-circle"></i>
    </CustomBadge>
  );
}

const CustomBadge = styled(Badge)`
  font-size: 0.6em;
`;
