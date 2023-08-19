import dotenv from "dotenv";
import { client, logger } from "./src/constants";

dotenv.config({ path:"./.env" });

logger.info("Registering UselessBot Commands...");

const TOKEN = process.env.DISCORD_TOKEN;

if (TOKEN === undefined) {
    logger.info("You have not set the DISCORD_TOKEN environment variable");
    process.exit(0);
}

client.on("ready", async () => {
    if (!client.user || !client.application) {
        return;
    }
    // TODO: finish stuff here
});