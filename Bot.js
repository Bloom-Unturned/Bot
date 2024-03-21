import {} from 'dotenv/config';
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

client.login("NzczMjk0NDk2ODc5ODY5OTg0.GDxsB2.7_QIEpHNFnORQeKoN83pgpbe2EXIVtG3unRmg8");
