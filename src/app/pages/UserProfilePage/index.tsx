/**
 *
 * UserProfilePage
 *
 */
import { Footer } from 'app/components/Footer';
import { Header } from 'app/components/Header';
import * as React from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useUserProfileSlice } from './slice';
import { selectEmail, selectIsFetching } from './slice/selectors';
interface Props {}

export function UserProfilePage(props: Props) {
  const { actions } = useUserProfileSlice();

  const email = useSelector(selectEmail);
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
      <Container className="text-left wrapper flex-grow-1">
        <div
          className="d-block mt-5 mb-5 font-weight-light"
          style={{ fontSize: '2em' }}
        >
          Welcome{' '}
          {isFetching ? <Spinner animation="grow" /> : email.split('@')[0]}
        </div>
      </Container>
      <Footer />
    </div>
  );
}
