import request from 'supertest';
import { App } from '../../src/app';
import dotenv from 'dotenv';
import { AUTH_COOKIE_NAME, createAuthToken } from '../../src/middleware/auth-middleware';
import { UserViewModel } from '../../src/models/UserViewModel';

dotenv.config();

const app = new App().app;

const testUser: UserViewModel = { id: 1, login: 'tester', email: 'tester@example.com' };
const authCookie = `${AUTH_COOKIE_NAME}=${createAuthToken(testUser)}`;

describe('Game API Integration Tests', () => {
    
    it('should return 200 OK and render games list', async () => {
        const res = await request(app).get('/games');
        expect(res.status).toBe(200);
        expect(res.text).toContain('Game Library');
    });

    it('should return 200 OK for create game page', async () => {
        const res = await request(app).get('/games/new');
        expect(res.status).toBe(200);
        expect(res.text).toContain('Create Game');
    });

    it('should return 404 for non-existent game', async () => {
        const res = await request(app).get('/games/999999');
        expect(res.status).toBe(404);
        expect(res.text).toContain('Not found');
    });

    it('should redirect to games after successful creation', async () => {
        const newGame = {
            title: 'Test Game Integration',
            developer: 'Test Dev',
            year: 2024,
            genre: 'Test Genre',
            description: 'This is a test game description'
        };

        const res = await request(app)
            .post('/games')
            .set('Cookie', authCookie)
            .type('form')
            .send(newGame);

        expect(res.status).toBe(302);
        expect(res.header.location).toBe('/games');

        it('should block creating a game without authentication', async () => {
        const res = await request(app)
            .post('/games')
            .type('form')
            .send({});

        expect(res.status).toBe(401);
    });
    });
});
