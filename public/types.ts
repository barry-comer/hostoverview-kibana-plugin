import { NavigationPublicPluginStart } from '../../../src/plugins/navigation/public';

export interface HostOverviewPluginSetup {
  getGreeting: () => string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HostOverviewPluginStart {}

export interface AppPluginStartDependencies {
  navigation: NavigationPublicPluginStart;
}
