import request from 'supertest';
import { App } from '../../src/app';
import dotenv from 'dotenv';
import { pool } from '../../src/db/db';

dotenv.config();

const app = new App().app;

describe('Game API Integration Tests', () => {
    
    afterAll(async () => {
        await pool.end();
    });

    it('should return 200 OK and render games list', async () => {
        const res = await request(app).get('/games');
        expect(res.status).toBe(200);
    });

    it('should redirect to login for create game page without authentication', async () => {
        const res = await request(app).get('/games/new');
        expect(res.status).toBe(302);
        expect(res.header.location).toBe('/auth/login');
    });

    it('should return 404 for non-existent game', async () => {
        const res = await request(app).get('/games/999999');
        expect(res.status).toBe(404);
    });

    it('should block creating a game without authentication', async () => {
        const res = await request(app)
            .post('/games')
            .type('form')
            .send({
                title: 'Hacker Game',
                developer: 'Anon',
                year: 2024,
                genre: 'Action',
                description: 'No auth'
            });

        expect(res.status).toBe(302);
        expect(res.header.location).toBe('/auth/login');
    });
});