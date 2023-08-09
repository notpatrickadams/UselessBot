import { AttachmentBuilder, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import Jimp from "jimp";

export const data = new SlashCommandBuilder()
    .setName("where")
    .setDescription("Where?")
    .addStringOption(option => 
        option
            .setName("thing")
            .setDescription("The thing you don't know where is")
            .setRequired(true)
    );

export const execute = async (interaction: CommandInteraction) => {
    const thing = interaction.options.get("thing")?.value?.toString();
    Jimp.read("src/images/banana.jpg", (err, where) => {
        if (err) throw err;
        where.getBuffer(Jimp.MIME_PNG, () => {
            Jimp.loadFont((Jimp.FONT_SANS_32_BLACK)).then(font => {
                where.print(font, 440, 20, `Where ${ thing }?`);
                return where;
            }).then((image) => {
                image.getBuffer(Jimp.MIME_PNG, (err, val) => {
                    const attachment: AttachmentBuilder = new AttachmentBuilder(val).setName("where.png");
                    const embed = new EmbedBuilder().setImage("attachment://where.png");
                    interaction.reply({ embeds: [embed], files: [attachment] });
                });
            });
        });
    });
};