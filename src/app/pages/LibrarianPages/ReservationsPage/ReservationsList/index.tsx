import React, { memo, useEffect } from 'react';
import { Table, Col, Button, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchReservationsSlice } from './slice';
import { selectReservations } from './slice/selectors';
import { ReservationId } from './slice/types';

const features = [
  'Book',
  'ISBN',
  'Copies',
  'University ID',
  'Date of Reservation',
  'Return Date',
  'Status',
  'Actions',
];

export const ReservationsList = memo(() => {
  const { actions } = useFetchReservationsSlice();
  const dispatch = useDispatch();
  const reservationsSelected = useSelector(selectReservations);
  console.log('Before: ', reservationsSelected);
  const useEffectOnMount = (effect: React.EffectCallback) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(effect, []);
  };
  useEffectOnMount(() => {
    dispatch(actions.requestFetchReservations());
  });

  const handleAcceptReservation = (id: ReservationId): void => {
    dispatch(actions.requestAcceptReservation(id));
  };
  const handleDenyReservation = (id: ReservationId): void => {
    dispatch(actions.requestDenyReservation(id));
  };

  const statusToBadge = {
    pending: 'warning',
    active: 'success',
    rejected: 'alert',
  };
  return (
    <Table className="w-100 mr-5 ml-5" striped bordered hover>
      <thead>
        <tr
          key={1}
          className="text-center"
          style={{
            backgroundColor: '#707070',
            color: '#E5E5E5',
            fontFamily: 'Lato',
          }}
        >
          {features.map((feature, i) => (
            <th key={i * 10}>{feature}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {reservationsSelected.reservations.map((reservation, i) => (
          <tr key={i + 1} className="text-center align-items-center">
            <td className="col-3">{reservation.book.title}</td>
            <td className="col-1">{reservation.book.isbn}</td>
            <td className="col-1">{reservation.book.copiesNbr}</td>
            <td className="col-2">{reservation.user.universityID}</td>
            <td className="col-2">{reservation.reservedAt.substring(0, 10)}</td>
            <td className="col-2">
              {reservation.returnDate
                ? reservation.returnDate.substring(0, 10)
                : 'N/A'}
            </td>
            <td className="col-1">
              <Badge variant={statusToBadge[reservation.reservationStatus]}>
                {reservation.reservationStatus.charAt(0).toUpperCase() +
                  reservation.reservationStatus.slice(1)}
              </Badge>
            </td>
            <td className="col-1">
              <div className="d-flex flex-row">
                <Col xs={6}>
                  <Button
                    disabled={reservation.reservationStatus === 'active'}
                    onClick={() =>
                      handleAcceptReservation({ id: reservation.id })
                    }
                    className="btn-success btn-sm"
                  >
                    Accept
                  </Button>
                  <Button
                    disabled={reservation.reservationStatus === 'denied'}
                    onClick={() =>
                      handleDenyReservation({ id: reservation.id })
                    }
                    className="btn-danger w-100 btn-sm"
                  >
                    Deny
                  </Button>
                </Col>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
});
