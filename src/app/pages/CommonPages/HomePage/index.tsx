import * as React from 'react';
import { Redirect } from 'react-router-dom';

export function HomePage() {
  return <Redirect to="/auth" />;
}
