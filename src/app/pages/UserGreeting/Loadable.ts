/**
 *
 * Asynchronously loads the component for UserGreeting
 *
 */

import { lazyLoad } from 'utils/loadable';

export const UserGreeting = lazyLoad(
  () => import('./index'),
  module => module.UserGreeting,
);
