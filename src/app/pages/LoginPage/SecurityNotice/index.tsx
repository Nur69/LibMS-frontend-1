import * as React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

export function SecurityNotice() {
  return (
    <Row>
      <Col>
        <h4>Security Notice</h4>
        <div className="mt-1">
          <small>
            Logging in will allow you to access SMU Library's resources. Make
            sure not to share your credentials.
          </small>
          <div>
            <small>
              <CustomIcon className="bi bi-arrow-right-circle-fill mr-2"></CustomIcon>
            </small>
            <Link to="/">
              <small>Forgot password?</small>
            </Link>
          </div>
        </div>
      </Col>
    </Row>
  );
}

const CustomIcon = styled.i`
  color: #203549;
`;
