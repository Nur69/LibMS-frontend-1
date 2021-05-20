import { Button } from 'react-bootstrap';

const acceptReservation = () => {};

export function AcceptButton() {
  return (
    <Button onClick={acceptReservation} className="w-100 btn-success btn-sm">
      Accept
    </Button>
  );
}
