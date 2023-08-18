import { CommandInteraction, EmbedBuilder, SlashCommandBuilder, OAuth2Scopes } from "discord.js";
import { client } from "../constants";

export const data = new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Want to invite UselessBot to your server?");

export const execute = async (interaction: CommandInteraction) => {
    if (client.application) {
        const scope = [
            OAuth2Scopes.Bot,
            OAuth2Scopes.ApplicationsCommands
        ].join("+");
        const clientId: string = client.application.id;
        const embed = new EmbedBuilder()
            .setTitle("Invite UselessBot to your server!")
            .setURL(`https://discord.com/oauth2/authorize?client_id=${ clientId }&scope=${ scope }`)
            .setThumbnail("https://cdn.discordapp.com/avatars/594333252945444879/cd63ae72b1d529b5db39fcaa72c25f3b?size=512")
            .setDescription("Click the link to invite UselessBot to your server!")
            .toJSON();        
    
        await interaction.reply({ ephemeral: true, embeds: [embed] });
    }
};