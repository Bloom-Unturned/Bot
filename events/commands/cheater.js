import { SlashCommandBuilder } from 'discord.js';

const create = () => {
    const command = new SlashCommandBuilder()
        .setName('cheater')
        .setDescription('Muestra los como reportar un cheater');

    return command.toJSON();
};

const invoke = async (interaction) => {
    try {
        interaction.reply({
            content: `Hay un cheater en el servidor? crea un ticket en <#834039811081502761>, deberás **proveer su perfil de la pagina** visitando [el apartado de players](https://bloomnetwork.online/players). Screenshots de sus stats, nombre o tickets vacios **relentizan la sancion al cheater**, en su defecto su steamid será suficiente.`
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
