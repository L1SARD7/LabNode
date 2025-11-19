import { app } from './app';
import { runDB } from './db/db';

const PORT = process.env.PORT || 3000;

const startApp = async () => {
    await runDB();
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
};

startApp();
