import { randomInt } from "crypto";

export function chooseRandomGif(urls: string[]) {
    return urls[randomInt(urls.length)];
}