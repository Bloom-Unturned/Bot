import { SlashCommandBuilder } from 'discord.js';
import puppeteer from 'puppeteer';

const create = () => {
    const command = new SlashCommandBuilder()
        .setName('server')
        .setDescription('Displays the stats for the server');

    return command.toJSON();
};

const invoke = async (interaction) => {
    try {
        const browser = await puppeteer.launch({
            ignoreHTTPSErrors: true, // Ignore SSL certificate errors
        });
        const page = await browser.newPage();

        // Navigate to the webpage
        await page.goto('https://unturned-servers.net/statistics/chart/daily/players/332822/');

        // Wait for the specific div to appear
        await page.waitForSelector('#chartdiv');

        // Delay for a few seconds to ensure the chart is fully rendered
        await page.waitForTimeout(1000); // Use waitForTimeout instead of new Promise(resolve => setTimeout(resolve, 1000))

        // Capture screenshot of the specific div
        const divScreenshot = await page.$('#chartdiv');
        let screenshot = await divScreenshot.screenshot();

        await browser.close();
        interaction.reply({
            files: [{
                attachment: screenshot,
                name: 'chart.png'
            }],
            content: `Last updated`,
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
