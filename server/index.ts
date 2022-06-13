import { PluginInitializerContext } from '......srccoreserver';
import { HostOverviewPlugin } from './plugin';

//  This exports static code and TypeScript types,
//  as well as, Kibana Platform `plugin()` initializer.

export function plugin(initializerContext: PluginInitializerContext) {
  return new HostOverviewPlugin(initializerContext);
}

export { HostOverviewPluginSetup, HostOverviewPluginStart } from './types';
