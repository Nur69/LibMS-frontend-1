/**
 *
 * Asynchronously loads the component for ReservationsPage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const ReservationsPage = lazyLoad(
  () => import('./index'),
  module => module.ReservationsPage,
);
