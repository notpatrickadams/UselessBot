import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("ud")
    .setDescription("The bot gets the Urban Dictionary definition of the term supplied")
    .addStringOption(option => 
        option
            .setName("term")
            .setDescription("The term you want to search on UrbanDictionary")
            .setRequired(true)
    );

export const execute = async (interaction: CommandInteraction) => {
    const term = interaction.options.get("term")?.value?.toString();
    const res = await fetch(`https://api.urbandictionary.com/v0/define?term=${ term }`);
    if (res.ok) {
        const json = await res.json();
        const list = json["list"];
        if (list.length === 0) {
            await interaction.reply({ content: "Couldn't find that term on UrbanDictionary", ephemeral: true });
        } else {
            const embed = new EmbedBuilder()
                .setTitle(list[0]["word"])
                .setDescription(`Definition: ${ list[0]["definition"] }`)
                .setURL(list[0]["permalink"])
                .toJSON();
            await interaction.reply({ embeds: [embed] });
        }
    }
};