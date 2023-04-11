import { Chance } from "chance";
import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";

const chance = new Chance();

const bibleQuote = new SlashCommandBuilder()
    .setName("biblequote")
    .setDescription("Randomly quotes someone from the bible");

function generateBibleSection() {
    const namesArr = ["Matthew", "Mark", "Luke", "John", "Acts", "Romans", "Revelation"];
    return namesArr[chance.integer({ min: 0, max: namesArr.length - 1 })] + " " + chance.integer({ min: 1, max: 14 }).toString() + ":" + chance.integer({ min: 1, max: 23 }).toString()
}

function generateRealisticGodImage() {
    const godUrls = [
        "http://3.bp.blogspot.com/-vUDR-pipPvc/Tuj5julMHoI/AAAAAAAAJV0/_YJQK4W-kv8/s1600/016.JPG",
        "https://larrysanger.org/wp-content/uploads/2020/01/god.jpg",
        "https://www.cefonline.com/wp-content/uploads/2017/09/ThinkstockPhotos-665724238-reduced.jpg",
        "https://gameranx.com/wp-content/uploads/2021/01/God-of-War-Kratos.jpg",
        "https://i.swncdn.com/media/800w/via/7095-istockgetty-images-pluschristianchan-1.jpg",
        "http://img3.wikia.nocookie.net/__cb20110812033433/itsalwayssunny/images/3/3d/Frank_(4).jpg"
    ];
    return godUrls[chance.integer({ min: 0, max: godUrls.length - 1 })];
}

export default {
    data: bibleQuote,
    async execute(interaction: CommandInteraction) {
        let res = await fetch("https://api.kanye.rest/");
        if (res.ok) {
            const json = await res.json();
            const quote = json["quote"];
            const embed = new EmbedBuilder()
                .setTitle(generateBibleSection())
                .setDescription(quote)
                .setImage(generateRealisticGodImage())
                .toJSON();
            await interaction.reply({ embeds: [embed] });
        } else {
            await interaction.reply({ content: "Can't read the bible right now", ephemeral: true });
        }
    }
}