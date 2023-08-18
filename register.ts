import dotenv from "dotenv";
import { client, logger } from "./src/constants";
import { magicSeven, hi, rate, urbanDictionary, bee, pokemon, about, butterfree, where, invite } from "./src/commands";

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
    const commandDataArr = [
        magicSeven.data,
        hi.data,
        rate.data,
        urbanDictionary.data,
        bee.data,
        pokemon.data,
        about.data,
        butterfree.data,
        where.data,
        invite.data
    ];

    commandDataArr.forEach(async (commandData) => {
        await client.application?.commands.create(commandData);
        logger.info(`Creating slash command: /${ commandData.name }`);
        if (commandData === commandDataArr[commandDataArr.length - 1]) {
            logger.info("Last command was resgistered... Shutting down.");
            process.exit(0);
        }
    });
});

client.login(TOKEN);