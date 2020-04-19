const { RichEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

const bot = require('../../../bot');
const { findModule } = require('../index');
const { send } = require('../../../utils/chat');

exports.run = async (msg, args) => {
    const chanceHuman = 0.5; // Percentage chance to be human

    const humanColor = '566cc3'; // Blue
    const violentColor = 'e61919'; // Red
    const passiveColor = '71368a '; // Purple

    const humanIcon = 'https://i.imgur.com/6zGJ0Ku.png';
    const passiveIcon = 'https://i.imgur.com/0HAJzpW.png';
    const violentIcon = 'https://i.imgur.com/jvXpZ8L.png';

    if (args.length < 1) {
        send(msg.channel, 'Please include a module to receive your catalyst. You can run the `module` command to find out your options.');
        return true;
    }

    const selectedModule = findModule(args.join(' '));

    if (!selectedModule) {
        send(msg.channel, 'Unknown module. You can run the `module` command to find out your options.');
        return true;
    }

    const module = await bot.db.get('modules', selectedModule.key);

    if (!module) {
        send(msg.channel, 'Unknown module. You can run the `module` command to find out your options.');
        return true;
    }

    let roleCard = new RichEmbed();
    if (Math.random() < chanceHuman) {
        roleCard.setColor(humanColor)
            .setTitle('You are a Plain Human')
            .setDescription('**You have nothing to hide.**')
            .setThumbnail(humanIcon);
    } else {
        const roleIndex = Math.floor(Math.random() * module.robots.length);
        const role = module.robots[roleIndex];

        if (role.type === 'passive') {
            roleCard.setColor(passiveColor)
                .setTitle(`You are a Passive Robot: ${role.theme}`)
                .setDescription(stripIndents`
                    **Complete the penalty once for each
                    time you violate the below compulsion:**

                    ${role.compulsion}
                `)
                .setThumbnail(passiveIcon);
        } else if (role.type === 'violent') {
            role.tasks.push('Perform the penalty twice.');

            const tasks = role.tasks
                .map((task, i) => `**${String.fromCharCode(65 + i)}.** ${task}`)
                .join('\n');

            roleCard.setColor(violentColor)
                .setTitle(`You are a Violent Robot: ${role.theme}`)
                .setDescription(stripIndents`
                    **Complete 2/3 of the following, wait ten seconds,
                    then inform the investigator you are killing them.**

                    ${tasks}
                `)
                .setThumbnail(violentIcon);
        } else {
            roleCard.setColor('FFFF00')
                .setTitle('Error!')
                .setDescription(`There was an error. Please inform Abyss! with \
                Error information - module: ${args.join(' ')}, index ${roleIndex}`);

        }
    }

    await send(msg.author, roleCard);

    return true;
};

exports.usage = new Map();

exports.config = {
    name: 'Subject Catalysts (Role cards)',
    cmd: 'subject',
    alias: ['role', 'rolecard', 'catalyst'],
    botPermissions: [], // Permissions needed by the bot to use this command.
    defaultPermissions: [], // Default permissions to use this command by user
    location: 'ALL', // 'GUILD_ONLY', 'DM_ONLY', 'ALL'
    description: 'Get subject catalyst (role card) for a given module',
    debug: false
};
