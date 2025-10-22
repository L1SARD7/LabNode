import express from 'express';
import { GamesRouter } from './routers/game-router';

export const app = express();
app.use(express.json());

app.use('/games', GamesRouter);
