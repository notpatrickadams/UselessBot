import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { fetchAllTrains } from "amtrak";
import { randomInt } from "crypto";
import { chooseRandomGif } from "../helpers";

export const CommandData = new SlashCommandBuilder()
    .setName("traintrack")
    .setDescription("Track where an Amtrak train is or was at a random point on its route.");

export const CommandExecution = async (interaction: CommandInteraction) => {
    const allTrains = await fetchAllTrains();
    const trainKeys = Object.keys(allTrains);
    const randomTrain = allTrains[trainKeys[randomInt(trainKeys.length)]][0];
    const randomStop = randomTrain.stations[randomInt(randomTrain.stations.length)];
    const trainEmbed = new EmbedBuilder()
        .setTitle(`Amtrak Train ${ randomTrain.trainNum }`)
        .setDescription(`Stop: ${ randomStop.name }\nScheduled Arrival: ${ randomStop.schArr }\nStatus: ${ randomStop.status }`)
        .setImage(chooseRandomGif([
            "https://media1.tenor.com/m/oly6Su3cALoAAAAd/thomas-the-train-funhaus.gif",
            "https://media1.tenor.com/m/TXxJyiGRHRsAAAAC/thomas-the.gif"
        ]))
        .toJSON();
    
    await interaction.reply({ embeds: [trainEmbed] });
};