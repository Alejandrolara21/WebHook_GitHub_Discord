import { envs } from "../../config";

export class DiscordService {

    private readonly discordUrl = envs.DISCORD_WEBHOOK_URL;

    constructor(){}


    async notify(message: string){
        const body = {
            content: message,
            embeds:[
                {
                    image: {
                        url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3hkdmVpN3lnNms1a3ZocnNtY3VreHR2MWJ4czhhNG93aWV2bG51eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BPJmthQ3YRwD6QqcVD/giphy.gif'
                    }
                }
            ]
        }

        const resp = await fetch(this.discordUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });

        if(!resp.ok){
            console.log('Error sending message to discord')
        }
    }


}