/**
 *
 * RegisterPage
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { Footer } from 'app/components/Footer';
import { Header } from 'app/components/Header';
import { Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RegisterForm } from './RegisterForm';
import { RegisterInfo } from './RegisterInfo';

interface Props {}

export function RegisterPage(props: Props) {
  return (
    <Div className="d-flex flex-column min-vh-100">
      <Header title="My SMU-Library Account" navItems={[]} account={false} />
      <Container className="text-left wrapper flex-grow-1">
        <RegisterDiv className="d-block mt-5 mb-5 font-weight-light">
          Register
        </RegisterDiv>
        <MainDiv className="d-block">
          <Row>
            <Col className="border-left">
              <RegisterForm />
            </Col>
            <Col className="border-left">
              <RegisterInfo />
              <Row className="mt-5">
                <Col>
                  <h4>Already have an account?</h4>
                  <Link to="/login">
                    <button type="button" className="btn btn-primary btn-sm">
                      Log in
                    </button>
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </MainDiv>
      </Container>
      <Footer />
    </Div>
  );
}

const Div = styled.div`
  background-color: #f6f8fb;
`;
// This is a recurrent div (check login page for instance).
// TODO: Move it to app/components and refactor pages that use it
const RegisterDiv = styled.div`
  font-size: 2em;
`;

const MainDiv = styled.div`
  font-size: 1.232em;
`;
