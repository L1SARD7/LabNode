import { App } from './app';
import dotenv from 'dotenv';

dotenv.config();

// Використовуємо порт від Render або 3000 локально
const port = process.env.PORT || 3000;
const server = new App().app;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
