import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";

function chooseRandomGif() {
    const gifChoices = [
        "https://media.tenor.com/LKMEOvqv1hMAAAAC/ash-butterfree.gif",
        "https://media.tenor.com/saqrsevceMYAAAAC/butterfree-ash.gif",
        "https://media.tenor.com/JFtZhvsR0mQAAAAC/triste.gif",
        "https://media.tenor.com/_hC2SU91dogAAAAC/oh-no.gif"
    ];
    return gifChoices[Math.floor(Math.random() * gifChoices.length)];
}

export const data = new SlashCommandBuilder()
    .setName("butterfree")
    .setDescription("Say goodbye to Butterfree");

export const execute = async (interaction: CommandInteraction) => {
    const randomGif = chooseRandomGif();
    const butterfreeEmbed = new EmbedBuilder()
        .setTitle("Bye Bye Butterfree")
        .setImage(randomGif)
        .toJSON();
    
    await interaction.reply({ embeds: [butterfreeEmbed] });
    (await interaction.fetchReply()).react("<:butterfree:1126702038684815360>");
};