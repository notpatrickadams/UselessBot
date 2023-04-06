import { Client, GatewayIntentBits } from "discord.js";
import ready from "./listeners/ready";

console.log("UselessBot is starting...");

const TOKEN = process.env.DISCORD_TOKEN;

if (TOKEN === undefined) {
    console.log("You have not set the DISCORD_TOKEN environment variable");
    process.exit(0);
}

const client = new Client({
    intents: [ 
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions
    ]
});

ready(client);

client.login(TOKEN);