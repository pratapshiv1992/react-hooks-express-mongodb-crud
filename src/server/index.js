import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import config from './config';
import loadRoutes from './api/index'

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
    cors({
        origin: ['http://localhost:3000', 'https://post-on-it.firebaseapp.com'],
        optionsSuccessStatus: 200,
        credentials: true
    })
);

mongoose.connect(config.db,(err) => {
    if (err) {console.log(`[MongoDB] Failed to connect. ${err}`);}
    else {
        loadRoutes(app);
        app.listen(config.apiPort, () => {
            console.log(`[Server] listening on port ${config.apiPort}`);
        });
        console.log(`[MongoDB] connected: ${config.db}`);
    }
});

export default app;
