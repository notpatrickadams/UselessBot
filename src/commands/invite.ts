import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { client } from "../constants";

export const data = new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Want to invite UselessBot to your server?");

export const execute = async (interaction: CommandInteraction) => {
    const clientId = client.application?.id;
    const embed = new EmbedBuilder()
        .setTitle("Invite UselessBot to your server!")
        .setURL(`https://discord.com/oauth2/authorize?client_id=${ clientId }&scope=bot+applications.commands`)
        .setThumbnail("http://upload.wikimedia.org/wikipedia/commons/c/cf/Curious_Raccoon.jpg")
        .setDescription("Click the link to invite UselessBot to your server!")
        .toJSON();        
    
    await interaction.reply({ ephemeral: true, embeds: [embed] });
};