import { Client, GatewayIntentBits } from "discord.js";
import ready from "./listeners/ready";
import dotenv from "dotenv";
import { client } from "./constants";

dotenv.config({ path:"./.env" })

console.log("UselessBot is starting...");

const TOKEN = process.env.DISCORD_TOKEN;

if (TOKEN === undefined) {
    console.log("You have not set the DISCORD_TOKEN environment variable");
    process.exit(0);
}

ready(client);

client.login(TOKEN);