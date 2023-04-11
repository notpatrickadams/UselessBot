import { Client } from "discord.js";
import magicSeven from "../commands/magicSeven";
import hi from "../commands/hi";
import rate from "../commands/rate";
import urbanDictionary from "../commands/urbanDictionary";
import bee from "../commands/bee";
import pokemon from "../commands/pokemon";
import biblequote from "../commands/biblequote";
import about from "../commands/about";

import { logger } from "../constants";

export default (client: Client): void => {
    client.on("ready", async () => {
        if (!client.user || !client.application) {
            return;
        }
        
        [
            magicSeven.data,
            hi.data,
            rate.data,
            urbanDictionary.data,
            bee.data,
            pokemon.data,
            biblequote.data,
            about.data
        ].forEach(async (commandData) => {
            await client.application?.commands.create(commandData);
            logger.info(`Creating slash command: /${ commandData.name }`);
        });
        logger.info(`${client.user.username} is online`);
    });

    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isCommand()) return;
        const { commandName } = interaction;
        const user = interaction.user;
        logger.info(`${ user.username }#${ user.discriminator } (${ user.id }) invoked /${ commandName }`);
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
            case "biblequote":
                biblequote.execute(interaction);
                break;
            case "about":
                about.execute(interaction);
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
}; 