type HealthResponse = {
    json: (payload: {
        status: string;
        uptime: number;
        timestamp: string;
    }) => void;
};

export function getHealth(_request: unknown, response: HealthResponse) {
    response.json({
        status: 'ok',
        uptime: 0,
        timestamp: new Date().toISOString()
    });
}
