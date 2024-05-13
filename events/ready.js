import fs from 'fs';
import { ActivityType } from 'discord.js';
import { joinVoiceChannel } from '@discordjs/voice';
import { join } from 'path';
import pterosocket from 'pterosocket';

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

    const guild = await client.guilds.fetch("834039810301100093");
    console.log(guild.id);
    
    // Ensure guild.voiceAdapterCreator is a valid function
    if (guild && guild.voiceAdapterCreator && typeof guild.voiceAdapterCreator === 'function') {
        const voiceConnection = joinVoiceChannel({
            channelId: "1199487587547627600",
            guildId: guild.id,
            adapterCreator: guild.voiceAdapterCreator // Pass the voiceAdapterCreator function
        });
    
        // Further operations with voiceConnection...
    } else {
        console.error("Guild or voiceAdapterCreator is invalid");
    }
    
    console.log(`Successfully logged in as ${client.user.tag}!`);
    
}

export { once, name, invoke };
