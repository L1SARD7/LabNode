import express, { Express } from 'express';
import path from 'path';
import { authRouter } from './routers/auth-router';
import { gameRouter } from './routers/game-router';
import { authSessionMiddleware } from './middleware/auth-session';

export class App {
    app: Express;

    constructor() {
        this.app = express();
        this.settings();
        this.middleware();
        this.routers();
    }

    settings() {
        this.app.set('view engine', 'ejs');
        this.app.set('views', path.join(process.cwd(), 'views'));
    }

    middleware() {
        this.app.use(express.static(path.join(process.cwd(), 'front')));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(authSessionMiddleware);
    }

    routers() {
        this.app.use('/auth', authRouter);
        this.app.use('/games', gameRouter);
        this.app.get('/', (req, res) => res.redirect('/games'));
    }
}
