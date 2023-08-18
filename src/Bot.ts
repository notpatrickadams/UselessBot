import { Client } from "discord.js";
import dotenv from "dotenv";
import { client, logger } from "./constants";
import { magicSeven, hi, rate, urbanDictionary, bee, pokemon, about, butterfree, where, invite } from "./commands";

dotenv.config({ path:"./.env" });

logger.info("UselessBot is starting...");

const TOKEN = process.env.DISCORD_TOKEN;

if (TOKEN === undefined) {
    logger.info("You have not set the DISCORD_TOKEN environment variable");
    process.exit(0);
}

function ready(client: Client): void {
    client.on("ready", async (client) => {
        const guildList = client.guilds.cache.map(guild => guild.id);
        logger.info(client.user.username + " is running in these Guilds: " + guildList.join(", "));
    });

    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isCommand()) return;
        
        const { commandName, guild } = interaction;
        const user = interaction.user;
        let serverId;

        if (guild !== null) {
            serverId = guild.id;
        } else {
            serverId = "None";
        }    
        
        logger.info(`${ user.username }${user.discriminator === "0" ? "" : "#" + user.discriminator } (${ user.id }) invoked /${ commandName } in Guild: ${ serverId }`);
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
        case "where":
            where.execute(interaction);
            break;
        case "invite":
            invite.execute(interaction);
            break;
        }
    });

    client.on("messageCreate", (message) => {
        if (!message.author.bot) {
            if (message.content.toLowerCase().includes("sus")) {
                logger.info(`Sus Reacted to a message from ${ message.author.username } in ${ message.guildId }`);
                message.react("<:sus:1011595741631885342>");
            }
            if (message.content.toLowerCase().includes("lamp")) {
                logger.info(`Moth Reacted to a message from ${ message.author.username } in ${ message.guildId }`);
                message.react("<:moth:1011626571930542202>");
            }
            if (message.content.toLowerCase().includes("bread")) {
                logger.info(`Bread Reacted to a message from ${ message.author.username } in ${ message.guildId }`);
                message.react("🍞");
            }
        }
    });
}

ready(client);

client.login(TOKEN).catch((err) => {
    if (err.code === "TokenInvalid") {
        logger.error("An invalid token was provided.");
    } else {
        logger.error(err);
    }
} );