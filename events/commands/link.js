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
            content: `Click [Here](https://bloomnetwork.online/Profile), Log in and link your discord account. https://cdn.discordapp.com/attachments/834039810838626307/1235822637721194567/Video_sin_titulo_Hecho_con_Clipchamp_68.gif?ex=6642f405&is=6641a285&hm=bedf3859933519571b17457855cd7b11eae3acb0a5cbf0d70b7213b8c0ca77aa&`
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
