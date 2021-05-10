/**
 *
 * UserGreeting
 *
 */
import { Footer } from 'app/components/Footer';
import { Header } from 'app/components/Header';
import * as React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { selectEmail } from '../LoginPage/LoginForm/slice/selectors';

interface Props {}

export function UserGreeting(props: Props) {
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
        {/** I need this to access the add book page without loosing the store */}
        <Link to="/add-book">
          <Button>Add Book</Button>
        </Link>
      </Container>
      <Footer />
    </Div>
  );
}

const Div = styled.div``;
