/**
 *
 * ReservationsPage
 *
 */
import * as React from 'react';
import { Col, Row } from 'react-bootstrap';
import { ReservationsList } from './ReservationsList';

export function ReservationsPage() {
  return (
    <Row className="h-25 align-items-center ml-4">
      <Col>
        <ReservationsList />
      </Col>
    </Row>
  );
}
