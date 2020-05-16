const { MessageEmbed } = require('discord.js');

const { findModule } = require('../index');
const { send } = require('../../../utils/chat');
const { stripIndentsExtra } = require('../../../utils/general');

const chanceHuman = 0.5; // Percentage chance to be human

const humanColor = '566cc3'; // Blue
const violentColor = 'e61919'; // Red
const patientColor = '71368a '; // Purple

const humanIcon = 'https://i.imgur.com/6zGJ0Ku.png';
const patientIcon = 'https://i.imgur.com/0HAJzpW.png';
const violentIcon = 'https://i.imgur.com/jvXpZ8L.png';

exports.run = async (msg, args) => {
    if (args.length < 1) {
        send(msg.channel, 'Please include a module to receive your catalyst. You can run the `module` command to find out your options.');
        return true;
    }

    const module = await findModule(args.join(' '));

    if (!module) {
        send(msg.channel, 'Unknown module. You can run the `module` command to find out your options.');
        return true;
    }

    let roleCard = new MessageEmbed();
    const roleIndex = Math.floor(Math.random() * module.robots.length);
    const humanRoll = Math.random();

    if (humanRoll < chanceHuman) {
        roleCard.setColor(humanColor)
            .setTitle('You are a Plain Human')
            .setDescription('**You have nothing to hide.**')
            .addField('\u200b', stripIndentsExtra`
                **Win Condition:**

                Survive until the end, and be stamped **HUMAN**.
            `)
            .setThumbnail(humanIcon);
    } else {
        const role = module.robots[roleIndex];

        if (role.type === 'patient') {
            roleCard.setColor(patientColor)
                .setTitle('You are a Patient Robot')
                .setDescription(stripIndentsExtra`
                    *${role.theme}*

                    **Once the timer has started:**

                    ${role.compulsion}
                `)
                .addField('\u200b', stripIndentsExtra`
                    **Win Condition:**

                    Survive until the end, and be stamped **HUMAN**.

                    You must complete the penalty once for every time you \
                    break your compulsion, *before you finish answering the \
                    final question.* If you do not, you must audibly malfunction \
                    in an obvious way until the Investigator submits **ROBOT**.
                `)
                .setThumbnail(patientIcon);
        } else if (role.type === 'violent') {
            role.tasks.push('Perform the penalty twice.');

            const tasks = role.tasks
                .map((task, i) => `**${String.fromCharCode(65 + i)}.** ${task}`)
                .join('\n');

            roleCard.setColor(violentColor)
                .setTitle('You are a Violent Robot')
                .setDescription(stripIndentsExtra`
                    *${role.theme}*

                    **Tasks:**

                    ${tasks}
                `)
                .addField('\u200b', stripIndentsExtra`
                    **Win Condition:**

                    Complete 2/3 of the above tasks, wait ten seconds, and then \
                    inform the Investigator you are killing them.

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
    description: 'Get Subject catalyst (role card) for a given module',
    debug: false
};
