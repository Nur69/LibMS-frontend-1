/**
 *
 * Asynchronously loads the component for AddBookPage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const BooksPage = lazyLoad(
  () => import('./index'),
  module => module.BooksPage,
);
