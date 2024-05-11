import express, { Request, Response } from 'express';
import { envs } from './config';
import { GitHubController } from './presentation/github/controller.github';
import { ValidateTokenGitHubMiddleware } from './presentation/middlewares/validateTokenGitHub.middleware';

(() => {
    main();
})();


function main () {

    const app = express();
    const controller = new GitHubController();

    app.use(express.json());

    app.use(ValidateTokenGitHubMiddleware.verifySignature);

    app.post('/api/github', controller.webhookHandler);

    app.listen(envs.PORT, () => {
        console.log(`Running on port ${envs.PORT}`)
    })
}