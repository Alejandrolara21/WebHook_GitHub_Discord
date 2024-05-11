import express, { Request, Response } from 'express';
import { envs } from './config';
import { GitHubController } from './presentation/github/controller.github';

(() => {
    main();
})();


function main () {

    const app = express();
    const controller = new GitHubController();

    app.use(express.json());

    app.post('/api/github', controller.webhookHandler);

    app.listen(envs.PORT, () => {
        console.log(`Running on port ${envs.PORT}`)
    })
}