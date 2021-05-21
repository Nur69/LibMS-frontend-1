export interface DenyReservation {
  id: string;
}
export interface DenyReservationState extends DenyReservation {
  returnDate: string;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
}
