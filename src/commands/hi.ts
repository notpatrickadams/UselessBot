import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const CommandData = new SlashCommandBuilder()
    .setName("hi")
    .setDescription("The bot says hi to you");

export const CommandExecution = async (interaction: CommandInteraction) => {
    await interaction.reply(`Hi <@${ interaction.user.id }>`);
};