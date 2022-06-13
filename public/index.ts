import './index.scss';

import { HostOverviewPlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, Kibana Platform `plugin()` initializer.
export function plugin() {
  return new HostOverviewPlugin();
}
export { HostOverviewPluginSetup, HostOverviewPluginStart } from './types';
