import { SlashCommandBuilder } from 'discord.js';
const create = () => {
    const command = new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Displays the stats for a user')
        .addStringOption(option =>
            option.setName('steamid')
                .setDescription('Give a steamid as input.')
                .setMaxLength(19)
                .setRequired(true));

    return command.toJSON();
};
const invoke = async (interaction) => {
    const user = interaction.options.getString('steamid');
    try {
        const response = await fetch(`https://api.bloomnetwork.online/players/player?steamid=${user}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        if(userData.result[0] == undefined) {
            return interaction.reply({
                content: `\`\`\`js\nNo available data from the player.\`\`\``
            });
        }    
        interaction.reply({
            content: `\`\`\`js\n${JSON.stringify(userData.result[0], null, 4)}\`\`\``
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
