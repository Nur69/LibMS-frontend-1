/**
 *
 * Asynchronously loads the component for AddBookPage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const AddBookPage = lazyLoad(
  () => import('./AddBookForm/index'),
  module => module.AddBook,
);
