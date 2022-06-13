import {
  PluginInitializerContext,
  CoreSetup,
  CoreStart,
  Plugin,
  Logger,
} from '../../../src/core/server';

import { HostOverviewPluginSetup, HostOverviewPluginStart } from './types';
import { defineRoutes } from './routes';

export class HostOverviewPlugin
  implements Plugin<HostOverviewPluginSetup, HostOverviewPluginStart> {
  private readonly logger: Logger;

  constructor(initializerContext: PluginInitializerContext) {
    this.logger = initializerContext.logger.get();
  }

  public setup(core: CoreSetup) {
    this.logger.debug('hostOverview: Setup');
    const router = core.http.createRouter();

    // Register server side APIs
    defineRoutes(router);

    return {};
  }

  public start(core: CoreStart) {
    this.logger.debug('hostOverview: Started');
    return {};
  }

  public stop() {}
}
