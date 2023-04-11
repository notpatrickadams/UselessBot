import { Colors, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { client, logger, userIdExp } from "../constants";

const rate = new SlashCommandBuilder()
    .setName("rate")
    .setDescription("The bot will randomly rate whatever you ask it to")
    .addStringOption(option => 
        option
            .setName("thing")
            .setDescription("The thing you want the bot to rate")
            .setRequired(true)
    );

export default {
    data: rate,
    async execute(interaction: CommandInteraction) {
        let stars: Array<string> = [
            "⭐", "⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐⭐⭐",
            "🌟", "🌟🌟", "🌟🌟🌟", "🌟🌟🌟🌟", "🌟🌟🌟🌟🌟",
            "🌠", "🌠🌠", "🌠🌠🌠", "🌠🌠🌠🌠", "🌠🌠🌠🌠🌠"
        ];
        let thing = interaction.options.get("thing")?.value?.toString()!;
        let expRes = userIdExp.exec(thing);
        // Try to find user ID
        if (expRes !== null) {
            let mentionedUser = client.guilds.resolve(interaction.guild!).members.resolve(expRes[0].replace("<", "").replace("@", "").replace(">", ""));
            let replacement = mentionedUser?.nickname ?? mentionedUser?.user.username;
            thing = thing.replace(expRes[0], replacement!);
        }

        let starsSent = stars[Math.floor(Math.random() * stars.length)];

        logger.info(`Rating ${ thing } ${ starsSent } stars`);

        let embed = new EmbedBuilder()
            .setTitle(thing)
            .setDescription(starsSent)
            .setColor(Colors.Yellow)
            .toJSON()
        await interaction.reply({ embeds: [embed] });
    }
}