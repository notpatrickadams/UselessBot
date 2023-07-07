import { CommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("magic7")
    .setDescription("Ask the Magic 7 Ball a question!")
    .addStringOption(option => 
        option
            .setName("inquiry")
            .setDescription("What you want to ask the Magic 7 ball")
            .setRequired(true)
    );

export const execute = async (interaction: CommandInteraction) => {
    const inquiry = interaction.options.get("inquiry")?.value?.toString();
    
    const possibleEmbeds: Array<EmbedBuilder> = [
        new EmbedBuilder().setImage("https://media.tenor.com/fvXdrZ402GIAAAAC/soup-on-friday-soup.gif"), // soup friday
        new EmbedBuilder().setImage("https://media.tenor.com/pCaXUuto_UEAAAAC/cat-spin-spin.gif"), // cat spinning in chair
        new EmbedBuilder().setImage("http://i1.kym-cdn.com/photos/images/original/000/131/686/immahitu.jpg"), // George Costanza
        new EmbedBuilder().setDescription("🤷").setImage("https://em-content.zobj.net/thumbs/120/google/350/basketball_1f3c0.png") // basketball
    ];
        
    //await interaction.reply({content:"Test", embeds: [responseEmbed]});
    await interaction.reply({ content: "", embeds: [possibleEmbeds[Math.floor(Math.random() * possibleEmbeds.length)].setTitle(`Question: ${ inquiry }`).toJSON()] });
};
