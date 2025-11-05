import express from 'express';
import path from 'path';
import { GamesRouter } from './routers/game-router';

export const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use(express.static(path.join(__dirname, '../front')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/games', GamesRouter);

app.get('/', (req, res) => {
    res.redirect('/games');
});
