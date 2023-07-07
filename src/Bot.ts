import { Client } from "discord.js";
import dotenv from "dotenv";
import { client, logger } from "./constants";
import { magicSeven, hi, rate, urbanDictionary, bee, pokemon, about, butterfree } from "./commands";

dotenv.config({ path:"./.env" });

logger.info("UselessBot is starting...");

const TOKEN = process.env.DISCORD_TOKEN;

if (TOKEN === undefined) {
    logger.info("You have not set the DISCORD_TOKEN environment variable");
    process.exit(0);
}

function ready(client: Client): void {
    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isCommand()) return;
        const { commandName } = interaction;
        const user = interaction.user;
        
        logger.info(`${ user.username }${user.discriminator === "0" ? "" : "#" + user.discriminator } (${ user.id }) invoked /${ commandName }`);
        switch (commandName) {
        case "magic7":
            magicSeven.execute(interaction);
            break;
        case "hi":
            hi.execute(interaction);
            break;
        case "rate":
            rate.execute(interaction);
            break;
        case "ud":
            urbanDictionary.execute(interaction);
            break;
        case "bee":
            bee.execute(interaction);
            break;
        case "pokemon":
            pokemon.execute(interaction);
            break;
        case "about":
            about.execute(interaction);
            break;
        case "butterfree":
            butterfree.execute(interaction);
            break;
        }
    });

    client.on("messageCreate", (message) => {
        if (!message.author.bot) {
            if (message.content.toLowerCase().includes("sus")) {
                message.react("<:sus:1011595741631885342>");
            }
            if (message.content.toLowerCase().includes("lamp")) {
                message.react("<:moth:1011626571930542202>");
            }
        }
    });
}

ready(client);

client.login(TOKEN);