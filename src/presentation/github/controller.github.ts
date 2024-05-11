import { Request, Response } from "express";
import { GitHubService } from "./../service/github.service";
import { DiscordService } from "../service/discord.service";

export class GitHubController {
    constructor(
        private readonly gitHubService = new GitHubService(),
        private readonly discordService = new DiscordService()
    ){}


    webhookHandler = (req: Request, res: Response) => {

        const githubEvent = req.header('x-github-event') ?? 'unknown';
        // const signature = req.header('x-hub-signature-256') ?? 'unknown';
        const payload = req.body;

        let message:string;
        
        switch(githubEvent){
            case 'star':
                message = this.gitHubService.onStar(payload);
                break; 
            case 'issues':
                message = this.gitHubService.onIssue(payload);
                break;             
            default:
                message = `Unknown Event: ${githubEvent}`;
        }

        this.discordService.notify(message)
            .then(() => res.status(202).send('Accepted'))
            .catch(() => res.json(500).json({error: 'Internal Server Error'}));
    }
}