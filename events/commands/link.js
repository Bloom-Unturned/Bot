import { SlashCommandBuilder } from 'discord.js';

const create = () => {
    const command = new SlashCommandBuilder()
        .setName('link')
        .setDescription('Links a user to a player');

    return command.toJSON();
};

const invoke = async (interaction) => {
    try {
        interaction.reply({
            content: `Click [Here](https://bloomnetwork.online/Profile), Log in and link your discord account`
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
        interaction.reply({
            content: 'Failed to fetch user data. Please try again later.',
            ephemeral: true,
        });
    }
};

export { create, invoke };
