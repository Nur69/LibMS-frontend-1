import { Button } from 'react-bootstrap';

const denyReservation = () => {};

export function DenyButton() {
  return (
    <Button onClick={denyReservation} className="btn-danger w-100 btn-sm">
      Deny
    </Button>
  );
}
