/**
 *
 * UserProfilePage
 *
 */
import { Footer } from 'app/components/Footer';
import { Header } from 'app/components/Header';
import * as React from 'react';
import { Button, Container, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useUserProfileSlice } from './slice';
import {
  selectFirstName,
  selectIsFetching,
  selectLastName,
} from './slice/selectors';
interface Props {}

export function UserProfilePage(props: Props) {
  const { actions } = useUserProfileSlice();

  const firstName = useSelector(selectFirstName);
  const lastName = useSelector(selectLastName);

  const isFetching = useSelector(selectIsFetching);

  const dispatch = useDispatch();

  const useEffectOnMount = (effect: React.EffectCallback) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(effect, []);
  };

  useEffectOnMount(() => {
    dispatch(actions.requestUserProfile({}));
  });

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header title="My SMU-Library Account" navItems={[]} account={false} />
      <Container className="text-center wrapper flex-grow-1 mt-5">
        <div
          className="d-block mt-5 mb-5 font-weight-light"
          style={{ fontSize: '2em' }}
        >
          Welcome{' '}
          {isFetching ? (
            <Spinner animation="grow" />
          ) : (
            firstName + ' ' + lastName
          )}
        </div>
        <div>
          <Link to="/dashboard/books">
            <Button className="mr-5"> Continue to Dashboard</Button>
          </Link>
          <Link to="add-book">
            <Button> Add Book to inventory</Button>
          </Link>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
