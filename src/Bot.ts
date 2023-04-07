import { Client, GatewayIntentBits } from "discord.js";
import ready from "./listeners/ready";
import dotenv from "dotenv";
import { client, logger } from "./constants";

dotenv.config({ path:"./.env" })

logger.info("UselessBot is starting...");

const TOKEN = process.env.DISCORD_TOKEN;

if (TOKEN === undefined) {
    logger.info("You have not set the DISCORD_TOKEN environment variable");
    process.exit(0);
}

ready(client);

client.login(TOKEN);