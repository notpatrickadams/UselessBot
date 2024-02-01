import { Client, EmbedBuilder, GatewayIntentBits, Partials } from "discord.js";
import { Logger } from "tslog";
import { createStream } from "rotating-file-stream";

export const client = new Client({
    intents: [ 
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions
    ],
    partials: [Partials.Message, Partials.Reaction, Partials.User, Partials.Channel]
});

export const userIdExp = /<@\d{17,18}>/;

// https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const rossEmbed = new EmbedBuilder().setImage("https://media1.tenor.com/m/-Xm4JnrbwlwAAAAC/bob-ross.gif").toJSON();

const stream = createStream("bot.log", {
    size: "10M",
    interval: "1d",
    compress: "gzip"
});
export const logger = new Logger({ name: "UselessBot" });
logger.attachTransport((logObj) => {
    stream.write(JSON.stringify(logObj) + "\n");
});