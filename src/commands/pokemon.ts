import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { PokemonClient, Pokemon } from "pokenode-ts";
import { Chance } from "chance";
import { capitalizeFirstLetter, logger } from "../constants";

const chance = new Chance();

export const CommandData = new SlashCommandBuilder()
    .setName("pokemon")
    .setDescription("Gives you a random Pokemon");

const defaultEmbed = new EmbedBuilder()
    .setTitle("Ash's Dad")
    .setImage("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/122.png")
    .addFields(
        { name: "Type", value: "Normal" }
    );

async function getRandomPokemon(api: PokemonClient): Promise<Pokemon | undefined> {
    const pkmnList = await (await api.listPokemonSpecies(0, 905)).results;
    const randomPokemon = await api.getPokemonByName(pkmnList[Math.floor(Math.random() * pkmnList.length)].name);
    const sprites = randomPokemon.sprites;
    if (sprites.other === undefined) {
        getRandomPokemon(api);
    } else {
        return randomPokemon;
    }
}

async function getPokemonEmbed() {
    const api = new PokemonClient();
    const randomPokemon = await getRandomPokemon(api);
    if (randomPokemon !== undefined) {
        let pokemonName = capitalizeFirstLetter(randomPokemon.name);
        const pokemonImage = chance.weighted([randomPokemon.sprites.front_default, randomPokemon.sprites.front_shiny], [19/20, 1/20]);
        const pokemonSpecies = api.getPokemonSpeciesByName(randomPokemon.species.name);
        let engText: string = "";
        const types: string[] = [];

        randomPokemon.types.forEach((pkmnType) => {
            types.push(capitalizeFirstLetter(pkmnType.type.name));
        });

        const typeString = types.join(" / ");

        for (const flavorText of (await pokemonSpecies).flavor_text_entries) {
            if (flavorText.language.name === "en") {
                engText = flavorText.flavor_text;
            }
        }

        if (pokemonImage === randomPokemon.sprites.front_shiny) {
            pokemonName = pokemonName + " ✨";
        }

        logger.info(`Generated ${ pokemonName }: ${ pokemonImage }`);

        return new EmbedBuilder()
            .setTitle(pokemonName)
            .setImage(pokemonImage)
            .setDescription(engText)
            .addFields(
                { name: "Types", value: typeString }
            );
    } 
    logger.error("Undefined random Pokemon. Ash's dad was sent");
    throw new Error("random Pokemon is undefined");
}

export const CommandExecution = async (interaction: CommandInteraction) => {
    try {
        const embed = (await getPokemonEmbed()).toJSON();
        await interaction.reply({ embeds: [embed] });
        return;
    } catch (e) {
        logger.error((e as Error).message);
        await interaction.reply({ embeds: [defaultEmbed.toJSON()] });
    }
};