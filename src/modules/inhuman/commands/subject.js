const { RichEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

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

    const module = await findModule(args.join(' '));

    if (!module) {
        send(msg.channel, 'Unknown module. You can run the `module` command to find out your options.');
        return true;
    }

    let roleCard = new RichEmbed();
    const roleIndex = Math.floor(Math.random() * module.robots.length);
    let humanRoll = Math.random();

    if (humanRoll < chanceHuman) {
        roleCard.setColor(humanColor)
            .setTitle('You are a Plain Human')
            .setDescription('**You have nothing to hide.**')
            .addField('Win Condition', 'Survive until the end, and be stamped Human.')
            .setThumbnail(humanIcon);
    } else {
        const role = module.robots[roleIndex];

        if (role.type === 'passive') {
            roleCard.setColor(passiveColor)
                .setTitle(`You are a Passive Robot: ${role.theme}`)
                .setDescription(stripIndents`
                    **Once the timer has started:**
                    ${role.compulsion}
                `)
                .addField('Win Condition', stripIndents`
                    Survive until the end, and be stamped Human.

                    You must complete the penalty once for every time you \
                    break your compulsion, *before you finish answering the \
                    final question.* If you do not, you must audibly malfunction \
                    in an obvious way until the Investigator submits **ROBOT**.
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
                    **Tasks:**
                    ${tasks}
                `)
                .addField('Win Condition', stripIndents`
                    Complete 2/3 of the above tasks, wait ten seconds, and then \
                    inform the investigator you are killing them.

                    You may continue to answer questions during the ten seconds.

                    You must complete this *before you finish answering the \
                    final question.* If you do not, you must audibly malfunction \
                    in an obvious way until the Investigator submits **ROBOT**.
                `)
                .setThumbnail(violentIcon);
        } else {
            roleCard.setColor('FFFF00')
                .setTitle('Error!')
                .setDescription(`There was an error. Please inform Abyss! with \
                a screenshot of this error, and then try rolling a new card.

                Error information - input: ${args.join(' ')}`);

        }
    }

    roleCard.setFooter(`${module.name} Module - rng: ${humanRoll.toFixed(2)}.${roleIndex}`);
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
