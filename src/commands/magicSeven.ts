import { EmbedBuilder } from "@discordjs/builders";
import { APIEmbed, CommandInteraction, CommandInteractionOptionResolver, Embed, SlashCommandBuilder } from "discord.js";

const magicSeven = new SlashCommandBuilder()
    .setName("magic7")
    .setDescription("Ask the Magic 7 Ball a question!")
    .addStringOption(option => 
        option
            .setName("inquiry")
            .setDescription("What you want to ask the Magic 7 ball")
            .setRequired(true)
    );

export default {
    data: magicSeven,
    async execute(interaction: CommandInteraction) {
        let inquiry = interaction.options.get("inquiry")?.value?.toString()!;
        
        let possibleEmbeds: Array<EmbedBuilder> = [
            new EmbedBuilder().setImage("https://media.tenor.com/fvXdrZ402GIAAAAC/soup-on-friday-soup.gif"), // soup friday
            new EmbedBuilder().setImage("https://media.tenor.com/pCaXUuto_UEAAAAC/cat-spin-spin.gif"), // cat spinning in chair
            new EmbedBuilder().setImage("http://i1.kym-cdn.com/photos/images/original/000/131/686/immahitu.jpg"), // George Costanza
            new EmbedBuilder().setDescription("🤷").setImage("https://em-content.zobj.net/thumbs/120/google/350/basketball_1f3c0.png") // basketball
        ];
           
        //await interaction.reply({content:"Test", embeds: [responseEmbed]});
        await interaction.reply({ content: "", embeds: [possibleEmbeds[Math.floor(Math.random() * possibleEmbeds.length)].setTitle(`Question: ${ inquiry }`).toJSON()] })
    }
};