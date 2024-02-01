import dotenv from "dotenv";
import { client, logger } from "./constants";
import { ImportedCommand, importCommands } from "./Commandler";

dotenv.config({ path:"./.env" });

logger.info("Registering UselessBot Commands...");

const TOKEN = process.env.DISCORD_TOKEN;

if (TOKEN === undefined) {
    logger.info("You have not set the DISCORD_TOKEN environment variable");
    process.exit(0);
}
client.on("ready", async () => {
    logger.info("Ready");
    if (!client.user || !client.application) {
        return;
    }
    const commandMap = await importCommands();
    
    const registeredCommands = await client.application.commands.fetch();
    for (const command of registeredCommands.values()) {
        if (!commandMap.has(command.name)) {
            const deleted = await command.delete();
            logger.info(`Deleted slash command: /${ deleted.name }`);
        } else {
            logger.info(`Slash command /${ command.name } is already registered`);
            commandMap.delete(command.name);
        }
    }
    logger.debug(`Registered Commands: ${ registeredCommands.size }`);

    if (commandMap.size === 0) {
        logger.info("No commands to register... Shutting down.");
        process.exit(0);
    }
    
    commandMap.forEach(async (command: ImportedCommand, commandName: string) => {
        if (client.application === null) {
            logger.fatal("Application is null for some reason at this point.");
            return;
        }

        if (registeredCommands.has(commandName)) {
            logger.info(`Slash command /${ commandName } is already registered`);
        }

        await client.application.commands.create(command.CommandData);
        commandMap.delete(commandName);
        logger.info(`Creating slash command: /${ commandName }`);
        if (commandMap.size === 0) {
            logger.info("Last command was resgistered... Shutting down.");
            process.exit(0);
        }
    });
});

client.login(TOKEN);