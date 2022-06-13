import { IRouter } from '../../../../src/core/server';

export function defineRoutes(router: IRouter) {
    router.get(
        {
            path: '/api/host_overview/example',
            validate: false,
        },
        async (context, request, response) => {
            return response.ok({
                body: {
                    time: new Date().toISOString(),
                },
            });
        },
    );
    router.get(
        {
            path: '/api/host_overview/host',
            validate: false,
        },
        async (context, request, response) => {
            return response.ok({
                body: {
                    success: true,
                    message: `yea`,
                    data: [
                        {
                            id: 0,
                            name: 'Satriani',
                            state: 1,
                        },
                        {
                            id: 1,
                            name: 'Vai',
                            state: 0,
                        },
                    ],
                },
            });
        },
    );
}
