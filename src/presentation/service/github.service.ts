import { GitHubIssuePayload, GitHubStarPayload } from "../../interfaces";

export class GitHubService {

    constructor(){}

    onStar(payload:GitHubStarPayload): string {
        const { action, sender, repository } = payload;
        return `User ${sender.login}: ${action} star on ${repository.full_name}`;
    }

    onIssue(payload:GitHubIssuePayload): string {
        const {action, issue} = payload;

        if( action === 'opened') return `User ${issue.user.login}: ${action} issue with this title ${issue.title}`;
        if( action === 'closed') return `User ${issue.user.login}: ${action} issue with this title ${issue.title}`;
        if( action === 'reopened') return `User ${issue.user.login}: ${action} issue with this title ${issue.title}`;
        
        return `Unhandled action for the issue event ${action}`;
    }
}