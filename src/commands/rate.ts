import { Colors, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { client, logger, userIdExp } from "../constants";

export const data = new SlashCommandBuilder()
    .setName("rate")
    .setDescription("The bot will randomly rate whatever you ask it to")
    .addStringOption(option => 
        option
            .setName("thing")
            .setDescription("The thing you want the bot to rate")
            .setRequired(true)
    );

export const execute = async (interaction: CommandInteraction) => {
    const stars: Array<string> = [
        "⭐", "⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐⭐⭐",
        "🌟", "🌟🌟", "🌟🌟🌟", "🌟🌟🌟🌟", "🌟🌟🌟🌟🌟",
        "🌠", "🌠🌠", "🌠🌠🌠", "🌠🌠🌠🌠", "🌠🌠🌠🌠🌠"
    ];
    let thing = interaction.options.get("thing")?.value?.toString();
    if (thing !== null && thing !== undefined) {
        const expRes = userIdExp.exec(thing);
    
        // Try to find user ID
        if (expRes !== null) {
            if (interaction.guild !== null) {
                const mentionedUser = client.guilds.resolve(interaction.guild).members.resolve(expRes[0].replace("<", "").replace("@", "").replace(">", ""));
                const replacement = mentionedUser?.nickname ?? mentionedUser?.user.username;
                if (typeof replacement === "string") {
                    thing = thing.replace(expRes[0], replacement);
                }
            }
        }
    }

    const starsSent = stars[Math.floor(Math.random() * stars.length)];

    logger.info(`Rating ${ thing } ${ starsSent } stars`);

    if (thing === undefined) {
        await interaction.reply({ content: "This thing couldn't be rated for some reason", ephemeral: true });
        return;
    }

    const embed = new EmbedBuilder()
        .setTitle(thing)
        .setDescription(starsSent)
        .setColor(Colors.Yellow)
        .toJSON();
    await interaction.reply({ embeds: [embed] });
};