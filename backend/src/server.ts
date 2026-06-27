import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { env } from './config/env.js';
import { logger } from './config/logger.js';
import { connectMongo } from './database/mongo.js';
import { createApp } from './app.js';

async function bootstrap() {
    await connectMongo();

    const app = createApp();
    const httpServer = createServer(app);

    const io = new Server(httpServer, {
        cors: {
            origin: env.CLIENT_ORIGIN,
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        socket.emit('server:connected', {
            connectedAt: new Date().toISOString()
        });
    });

    httpServer.listen(env.PORT, () => {
        logger.info({ port: env.PORT }, 'NetLens API listening');
    });
}

void bootstrap();
