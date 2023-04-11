import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";

const about = new SlashCommandBuilder()
    .setName("about")
    .setDescription("Info about UselessBot");

export default {
    data: about,
    async execute(interaction: CommandInteraction) {
        const uselessBotEmbed = new EmbedBuilder()
            .setTitle("Hello!")
            .setDescription("I'm UselessBot. I have weird commands.")
            .setThumbnail("http://upload.wikimedia.org/wikipedia/commons/c/cf/Curious_Raccoon.jpg")
            .toJSON();

        const githubEmbed = new EmbedBuilder()
            .setTitle("GitHub Repo")
            .setURL("https://github.com/notpatrickadams/UselessBot")
            .setThumbnail("https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png")
            .setDescription("https://github.com/notpatrickadams/UselessBot")
            .toJSON();
        
        await interaction.reply({ ephemeral: true, embeds: [uselessBotEmbed, githubEmbed] });
    }
}