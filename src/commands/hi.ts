import { CommandInteraction, SlashCommandBuilder } from "discord.js";

const hi = new SlashCommandBuilder()
    .setName("hi")
    .setDescription("The bot says hi to you");

export default {
    data: hi,
    async execute(interaction: CommandInteraction) {
        await interaction.reply(`Hi <@${ interaction.user.id }>`);
    }
}