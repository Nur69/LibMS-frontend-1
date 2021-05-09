/**
 *
 * UserGreeting
 *
 */
import { Footer } from 'app/components/Footer';
import { Header } from 'app/components/Header';
import * as React from 'react';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { userProfileActions } from './slice';
import { selectEmail } from './slice/selectors';

interface Props {}

export function UserGreeting(props: Props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userProfileActions.requestUserProfile);
  }, [dispatch]);
  const email = useSelector(selectEmail);

  return (
    <Div className="d-flex flex-column min-vh-100">
      <Header title="My SMU-Library Account" navItems={[]} account={false} />
      <Container className="text-left wrapper flex-grow-1">
        <div
          className="d-block mt-5 mb-5 font-weight-light"
          style={{ fontSize: '2em' }}
        >
          Welcome {email.split('@')[0]}
        </div>
      </Container>
      <Footer />
    </Div>
  );
}

const Div = styled.div``;
