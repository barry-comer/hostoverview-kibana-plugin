import { i18n } from '@kbn/i18n';
import { AppMountParameters, AppUpdater, CoreSetup, CoreStart, DEFAULT_APP_CATEGORIES, Plugin } from '../../../src/core/public';
import { BehaviorSubject } from 'rxjs';
import {
  HostOverviewPluginSetup,
  HostOverviewPluginStart,
  AppPluginStartDependencies,
} from './types';
import { PLUGIN_NAME } from '../common';

export class HostOverviewPlugin
  implements Plugin<HostOverviewPluginSetup, HostOverviewPluginStart> {
  private appStateUpdater = new BehaviorSubject<AppUpdater>(() => ({}));
  public setup(core: CoreSetup): HostOverviewPluginSetup {
    // Register an application into the side navigation menu
    core.application.register({
      id: 'hostOverview',
      title: 'Host Overview' || PLUGIN_NAME,
      updater$: this.appStateUpdater,
      euiIconType: 'logoElastic',
      order: 9010,
      category: DEFAULT_APP_CATEGORIES.management,
      async mount(params: AppMountParameters) {
        // Load application bundle
        const { renderApp } = await import('./application');
        // Get start services as specified in kibana.json
        const [coreStart, depsStart] = await core.getStartServices();
        // Render the application
        return renderApp(coreStart, depsStart as AppPluginStartDependencies, params);
      },
    });

    // Return methods that should be available to other plugins
    return {
      getGreeting() {
        return i18n.translate('hostOverview.greetingText', {
          defaultMessage: 'Hello from {name}!',
          values: {
            name: PLUGIN_NAME,
          },
        });
      },
    };
  }

  public start(core: CoreStart): HostOverviewPluginStart {
    return {};
  }

  public stop() {}
}
