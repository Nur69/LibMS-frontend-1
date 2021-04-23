/**
 *
 * Asynchronously loads the component for AddBookPage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const AddBookPage = lazyLoad(
  () => import('./index'),
  module => module.AddBookPage,
);
