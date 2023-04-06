import { Colors, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";

const rate = new SlashCommandBuilder()
    .setName("rate")
    .setDescription("The bot will rate whatever you ask it to")
    .addStringOption(option => 
        option
            .setName("thing")
            .setDescription("The thing you want the bot to rate")
            .setRequired(true)
    )
;

export default {
    data: rate,
    async execute(interaction: CommandInteraction) {
        let stars: Array<string> = [
            "⭐", "⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐⭐⭐",
            "🌟", "🌟🌟", "🌟🌟🌟", "🌟🌟🌟🌟", "🌟🌟🌟🌟🌟",
            "🌠", "🌠🌠", "🌠🌠🌠", "🌠🌠🌠🌠", "🌠🌠🌠🌠🌠"
        ];
        let embed = new EmbedBuilder()
            .setTitle(interaction.options.get("thing")?.value?.toString()!)
            .setDescription(stars[Math.floor(Math.random() * stars.length)])
            .setColor(Colors.Yellow)
            .toJSON()
        await interaction.reply({ embeds: [embed] });
    }
}