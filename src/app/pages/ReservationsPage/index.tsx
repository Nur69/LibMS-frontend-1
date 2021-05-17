/**
 *
 * ReservationsPage
 *
 */
import * as React from 'react';
import { Row } from 'react-bootstrap';
import { ReservationsList } from './ReservationsList';

export function ReservationsPage() {
  return (
    <Row className="justify-content-center h-75 w-100">
      <ReservationsList />
    </Row>
  );
}
