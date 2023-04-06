import { AttachmentBuilder, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import Jimp from "jimp";

const bee = new SlashCommandBuilder()
    .setName("bee")
    .setDescription("Creates a randomly colored bee")
;

function randomRGBA() {
    return Jimp.rgbaToInt(
        Math.round(Math.random() * 255),
        Math.round(Math.random() * 255),
        Math.round(Math.random() * 255),
        Math.round(Math.random() * 255),
    )
}

export default {
    data: bee,
    async execute(interaction: CommandInteraction) {
        const rand1 = randomRGBA();
        const rand2 = randomRGBA();
        const rand3 = randomRGBA();

        Jimp.read("src/images/bee.png", (err, bee) => {
            if (err) throw err;
            for (let i = 0; i < bee.getWidth(); i++) {
                for (let j = 0; j < bee.getHeight(); j++) {
                    switch (bee.getPixelColor(i, j)) {
                        case Jimp.rgbaToInt(237, 28, 36, 255):
                            bee.setPixelColor(rand1, i, j);
                            break;
                        case Jimp.rgbaToInt(255, 242, 0, 255):
                            bee.setPixelColor(rand2, i, j);
                            break;
                        case Jimp.rgbaToInt(63, 72, 204, 255):
                            bee.setPixelColor(rand3, i, j);
                            break;
                    }
                }
            }
            bee.getBuffer(Jimp.MIME_PNG, (err, val) => {
                const attachment: AttachmentBuilder = new AttachmentBuilder(val).setName("bee.png");
                interaction.reply({ embeds: [new EmbedBuilder().setTitle("Here's your bee!").setImage("attachment://bee.png")], files: [attachment] });
            })
        })
    }
}