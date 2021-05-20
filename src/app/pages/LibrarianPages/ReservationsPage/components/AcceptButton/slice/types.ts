export interface AcceptReservation {
  id: string;
}

export interface AcceptReservationState extends AcceptReservation {
  returnDate: string;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
}
