import React from 'react';
import ReactDOM from 'react-dom';
import { AppMountParameters, CoreStart } from '../../../src/core/public';
import { AppPluginStartDependencies } from './types';
import { HostOverviewApp } from './components/app';

export const renderApp = (
  { notifications, http, application }: CoreStart,
  { navigation }: AppPluginStartDependencies,
  { appBasePath, element }: AppMountParameters
) => {
  ReactDOM.render(
    <HostOverviewApp
      basename={appBasePath}
      notifications={notifications}
      http={http}
      navigation={navigation}
      application={application}
    />,
    element
  );

  return () => ReactDOM.unmountComponentAtNode(element);
};
