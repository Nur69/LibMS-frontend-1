/**
 *
 * ReservationsPage
 *
 */
import { Sidebar } from 'app/components/Sidebar';
import * as React from 'react';
import { Row, Col, Form, Badge, Dropdown, Nav, Navbar } from 'react-bootstrap';
import * as IconName from 'react-icons/fa';
import { ReservationsList } from './ReservationsList';

export function ReservationsPage() {
  return (
          <Row className="h-25 align-items-center ml-4">
            <Col>
            <ReservationsList/>
            </Col>
          </Row>
          
  );
}
