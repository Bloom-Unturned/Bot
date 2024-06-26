import 'dotenv/config';
import fs from 'fs';
import { Client, GatewayIntentBits } from 'discord.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const events = fs
	.readdirSync('./events')
	.filter((file) => file.endsWith('.js'));
for (let event of events) {

	const eventFile = await import(`#events/${event}`);

	if (eventFile.once)
		client.once(eventFile.name, (...args) => {
			eventFile.invoke(...args);
		});
	else
		client.on(eventFile.name, (...args) => {
			eventFile.invoke(...args);
		});
}
//const socket = new pterosocket(process.env.ORIGIN, process.env.API_KEY, process.env.SERVER_NO);
client.login(process.env.BOT_TOKEN);
