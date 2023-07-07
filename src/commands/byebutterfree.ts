import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("butterfree")
    .setDescription("Say goodbye to Butterfree");

export const execute = async (interaction: CommandInteraction) => {
    const butterfreeEmbed = new EmbedBuilder()
        .setTitle("Bye Bye Butterfree")
        .setImage("https://media.tenor.com/saqrsevceMYAAAAC/butterfree-ash.gif")
        .toJSON();
    
    await interaction.reply({ embeds: [butterfreeEmbed] });
    (await interaction.fetchReply()).react("<:butterfree:1126702038684815360>");
};