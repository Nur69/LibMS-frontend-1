import { memo } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchReservationsSlice } from './slice';
import { selectReservations } from './slice/selectors';

const features = [
  'Book',
  'ISBN',
  'Email',
  'University ID',
  'Date of Reservation',
  'Status',
];
export const ReservationsList = memo(() => {
  const { actions } = useFetchReservationsSlice();
  const dispatch = useDispatch();
  dispatch(actions.requestFetchReservations());
  const reservationsSelected = useSelector(selectReservations);

  return (
    
      <Table className="w-75 " striped bordered hover>
        <thead>
          <tr
            style={{
              backgroundColor: '#707070',
              color: '#E5E5E5',
              fontFamily: 'Lato',
            }}
          >
            {features.map(feature => (
              <th>{feature}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {reservationsSelected.reservations.map(reservation => (
            <tr>
              <td>{reservation.book.title}</td>
              <td>{reservation.book.isbn}</td>
              <td>{reservation.user.email}</td>
              <td>{reservation.user.universityID}</td>
              <td>{reservation.reservationDate.substring(0, 10)}</td>
              <td>
                {reservation.reservationStatus.charAt(0).toUpperCase() +
                  reservation.reservationStatus.slice(1)}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
  );
});
