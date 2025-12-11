import { App } from './app';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;
const server = new App().app;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
