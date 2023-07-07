import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("hi")
    .setDescription("The bot says hi to you");

export const execute = async (interaction: CommandInteraction) => {
    await interaction.reply(`Hi <@${ interaction.user.id }>`);
};