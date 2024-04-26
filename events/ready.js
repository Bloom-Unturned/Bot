import fs from 'fs';
import { ActivityType } from 'discord.js';

const once = true;
const name = 'ready';

async function invoke(client) {
    const commands = fs
        .readdirSync('./events/commands')
        .filter((file) => file.endsWith('.js'))
        .map((file) => file.slice(0, -3));

    const commandsArray = [];

    for (let command of commands) {
        const commandFile = await import(`#commands/${command}`);
        commandsArray.push(commandFile.create());
    }

    client.application.commands.set(commandsArray);
    await client.user.setActivity("Bloom opening May 1", {
        type: ActivityType.Streaming,
        url: "https://twitch.tv/bloom"
    });

    console.log(`Successfully logged in as ${client.user.tag}!`);
}

export { once, name, invoke };
