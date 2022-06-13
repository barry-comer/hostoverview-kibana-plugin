import React, { useState, useEffect } from 'react'
import { I18nProvider } from '@kbn/i18n/react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useHistory,
} from 'react-router-dom'
import {
    EuiPage,
    EuiPageBody,
    EuiBasicTable,
    EuiHealth,
} from '@elastic/eui'

import { CoreStart } from '../../../../src/core/public'
import { NavigationPublicPluginStart } from '../../../../src/plugins/navigation/public'

import './app.scss'

interface HostOverviewAppDeps {
    basename: string
    notifications: CoreStart['notifications']
    http: CoreStart['http']
    application: CoreStart['application']
    navigation: NavigationPublicPluginStart
}

export const HostOverviewApp = ({
                                    basename,
                                    notifications,
                                    http,
                                    application,
                                    navigation,
                                }: HostOverviewAppDeps) => {
    const [hostList, hostListSet] = useState<any[]>([])
    useEffect(() => {
        hostListGet()
    }, [])

    function hostListGet() {
        http.get('/api/host_overview/host').then((res) => {
            const { success, message, data } = res
            if (success) {
                hostListSet(data)
            } else {
                alert(message)
            }
        })
    }

    function HostList() {
        const history = useHistory()
        const columns = [
            {
                field: 'name',
                name: 'Host Name',
            },
            {
                field: 'state',
                name: 'State',
                dataType: 'boolean',
                render: (state: number) => {
                    const color = (state === 1) ? 'success' : 'danger'
                    const label = (state === 1) ? 'Online' : 'Offline'
                    return <EuiHealth color={color}>{label}</EuiHealth>
                },
            },
        ]
        const getRowProps = function(item: {id: number}) {
            const { id } = item
            return {
                'data-test-subj': `row-${id}`,
                className: 'customRowClass',
                onClick: () => {
                    history.push(`/${id}`)
                },
            }
        }
        return <EuiBasicTable
            tableCaption="Demo of EuiBasicTable"
            items={hostList}
            rowHeader="firstName"
            columns={columns}
            rowProps={getRowProps}
        />

    }

    function HostDetail() {
        const { id } = useParams<{id: any}>()
        return (
            <div className="ctHostDetail">
                <div className="df aic sb">
                    <div>
                        <Link to={'/'}
                        >
                            {'<<'} back
                        </Link>
                    </div>
                    <div>
                        <a onClick={event => {
                            application.navigateToUrl('/app/dashboards')
                        }}
                        >
                            Kibana Dashboard {'>>'}
                        </a>
                    </div>
                </div>
                <div className={'ctDetail'}>
                    {
                        (hostList.length > 0) && <>
                          Host Name: &nbsp;
                            {hostList[id].name}
                          <br/>
                          State: &nbsp;
                            {(hostList[id].state === 0) ? 'Online' : 'Offline'}
                        </>
                    }
                </div>
            </div>
        )
    }

    return (
        <>
            <Router basename={basename}>
                <I18nProvider>
                    <div className={'ctApp'}>
                        <EuiPage restrictWidth="1000px">
                            <EuiPageBody>
                                <Switch>
                                    <Route exact path="/">
                                        <HostList/>
                                    </Route>
                                    <Route exact path="/:id">
                                        <HostDetail/>
                                    </Route>
                                </Switch>
                            </EuiPageBody>
                        </EuiPage>
                    </div>
                </I18nProvider>
            </Router>
        </>
    )
}
