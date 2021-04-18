/**
 * Asynchronously loads the component for AuthPage
 */

import { lazyLoad } from 'utils/loadable';

export const AuthPage = lazyLoad(
  () => import('./index'),
  module => module.AuthPage,
);
