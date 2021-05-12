import { Form } from 'react-bootstrap';
import styled from 'styled-components/macro';

export const RequiredFormLabel = styled(Form.Label)`
  &:after {
    content: '*';
    color: red;
  }
`;
