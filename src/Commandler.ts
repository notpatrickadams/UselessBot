// The Commandler, a command handler. I'm so sorry.
// I'm not sorry.
import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { logger } from "./constants";
import * as fs from "fs";
import * as path from "path";

const commandsDirectory = path.join(__dirname, "commands");

export type ImportedCommand = {
    CommandData: SlashCommandBuilder,
    CommandExecution: (interaction: CommandInteraction) => Promise<void>
}

export async function importCommands() {
    const commandMap = new Map<string, ImportedCommand>();
    for (const file of fs.readdirSync(commandsDirectory)) {
        if (file.endsWith(".ts") || file.endsWith(".js")) {
            const importStr = path.join(__dirname + "/commands/") + file.slice(0, -3);
            try {
                const cmd = await import(importStr) as ImportedCommand;
                commandMap.set(file.slice(0, -3), cmd);
            } catch (error) {
                logger.error(error);
            }
        }
    }
    return commandMap;
}