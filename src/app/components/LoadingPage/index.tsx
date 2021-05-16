import React, { memo } from 'react';
import { Container } from 'react-bootstrap';
import Loader from 'react-loader-spinner';
import styled from 'styled-components/macro';

export const LoadingSpinner = memo(() => (
  <StyledContainer className="d-flex justify-content-center align-items-center">
    <Loader type="Puff" color="rgb(32, 53, 73)" height={200} width={200} />
  </StyledContainer>
));

const StyledContainer = styled(Container)`
  min-height: 100vh !important;
  min-width: 100vw !important;
  background-color: rgb(0, 126, 164);
`;
