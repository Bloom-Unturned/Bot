import { SlashCommandBuilder } from 'discord.js';

const create = () => {
    const command = new SlashCommandBuilder()
        .setName('garage')
        .setDescription('Muestra como utilizar el garage');

    return command.toJSON();
};

const invoke = async (interaction) => {
    try {
        interaction.reply({
            content: `Uso del garage virtual en el servidor:\n
            **/gg** -> Muestra los vehiculos disponibles en tu garage con sus id.\n
            **/gadd <id>** -> Guarda el vehiculo que estes mirando con un nombre especificado por tí. (deberá estar bloqueado por ti)\n
            **/gret <id>** -> Con la respectiva id conseguida en /gg saca el vehiculo del garage.`
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
