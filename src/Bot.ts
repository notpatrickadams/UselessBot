import { Client, CommandInteraction, SlashCommandBuilder } from "discord.js";
import dotenv from "dotenv";
import { client, logger } from "./constants";
import * as fs from "fs";
import * as path from "path";

type ImportedCommand = {
    CommandData: SlashCommandBuilder,
    CommandExecution: (interaction: CommandInteraction) => Promise<void>
}

dotenv.config({ path:"./.env" });

logger.info("UselessBot is starting...");

const TOKEN = process.env.DISCORD_TOKEN;

if (TOKEN === undefined) {
    logger.info("You have not set the DISCORD_TOKEN environment variable");
    process.exit(0);
}

const commandsDirectory = path.join(__dirname, "commands");
const commandMap = new Map<string, ImportedCommand>();

function ready(client: Client): void {
    client.on("ready", async (client) => {
        const guildList = client.guilds.cache.map(guild => guild.id);
        logger.info(client.user.username + " is running in these Guilds: " + guildList.join(", "));
        
        logger.info("Loading commands from src/commands:");
        fs.readdirSync(commandsDirectory).forEach(async (file) => {
            if (file.endsWith(".ts") || file.endsWith(".js")) {
                const importStr = "./commands/" + file.slice(0, -3);
                commandMap.set(file.slice(0, -3), await import(importStr) as ImportedCommand);
                logger.info(" - " + file.slice(0, -3));
            }
        });
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
        
        const usedCommand = commandMap.get(commandName);
        if (usedCommand !== undefined) {
            usedCommand.CommandExecution(interaction);
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