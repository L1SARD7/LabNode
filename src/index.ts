import { App } from './app';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;
const app = new App().app;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
