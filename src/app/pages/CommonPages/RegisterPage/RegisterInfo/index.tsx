import * as React from 'react';
import { Row, Col } from 'react-bootstrap';

export function RegisterInfo() {
  return (
    <Row>
      <Col>
        <h4>SMU Library Account</h4>
        <div className="mt-1">
          <small>
            Create an account using your SMU email (@smu.tn, @medtech.tn or
            @msb.tn). Please note that any other email domain is not allowed.
          </small>
        </div>
      </Col>
    </Row>
  );
}
