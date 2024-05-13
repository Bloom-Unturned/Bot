import { SlashCommandBuilder } from 'discord.js';

const create = () => {
    const command = new SlashCommandBuilder()
        .setName('horario')
        .setDescription('Muestra los horarios de raideo del servidor');

    return command.toJSON();
};

const invoke = async (interaction) => {
    try {
        interaction.reply({
            content: `Los horarios de raideo son desde <t:1715634000:t> hasta <t:1715644800:t> (3h). Ambas horas se convierten automaticamente a tu zona horaria, no hace falta preguntar "¿Pero en x que hora sería?".`
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
