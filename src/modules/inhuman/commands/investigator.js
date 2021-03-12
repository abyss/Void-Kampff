const { MessageEmbed } = require('discord.js');

const { findModule } = require('../index');
const { send } = require('../../../utils/chat');
const { shuffleArray } = require('../../../utils/general');

const asyncForEach = async function asyncForEach(array, callback) {
    for (let i = 0; i < array.length; i++) {
        await callback(array[i], i, array);
    }
};

exports.run = async (msg, args) => {
    const taskKeyColor = 'fef65b'; // Yellow
    const promptColor = '1cbe6a'; // Green
    const whilePromptColor = '566cc3'; // Blue

    if (args.length < 1) {
        send(msg.channel, 'Please include a module to receive your prompts. You can run the `module` command to find out your options.');
        return true;
    }

    const module = await findModule(args.join(' '));

    if (!module) {
        send(msg.channel, 'Unknown module. You can run the `module` command to find out your options.');
        return true;
    }

    const taskKey = new MessageEmbed()
        .setColor(taskKeyColor)
        .setTitle(`${module.name} Introduction (Read before you start the timer)`)
        .setDescription(module.intro);

    await send(msg.author, taskKey);

    let subjectPrompts = module.prompts;
    subjectPrompts = shuffleArray(subjectPrompts);

    await asyncForEach(subjectPrompts, async (prompt) => {
        const examples = prompt.examples
            .map((ex, i) => `**${String.fromCharCode(65 + i)}.** ${ex}`)
            .join('\n');
        const description = `*Suggested prompts:* \n${examples}`;
        const embed = new MessageEmbed()
            .setColor(promptColor)
            .setTitle(`${prompt.requirement}`)
            .setDescription(description)
            .setFooter('Subject must answer to be a human');

        await send(msg.author, embed);
    });

    const whilePrompts = module.prompts_while;
    shuffleArray(whilePrompts);

    await asyncForEach(whilePrompts, async (prompt) => {
        const examples = prompt.examples
            .map((ex, i) => `**${String.fromCharCode(65 + i)}.** ${ex}`)
            .join('\n');
        const description = `*Suggested prompts:* \n${examples}`;
        const embed = new MessageEmbed()
            .setColor(whilePromptColor)
            .setTitle(`${prompt.requirement}`)
            .setDescription(description)
            .setFooter('While fulfulling another prompt, Subject must answer to be a human');

        await send(msg.author, embed);
    });

    return true;
};

exports.usage = new Map();

exports.config = {
    name: 'Investigator Prompts',
    cmd: 'investigator',
    alias: ['investigate', 'investigater', 'prompt', 'prompts'],
    botPermissions: [], // Permissions needed by the bot to use this command.
    defaultPermissions: [], // Default permissions to use this command by user
    location: 'ALL', // 'GUILD_ONLY', 'DM_ONLY', 'ALL'
    description: 'Get investigator prompts for the chosen module',
    debug: false
};
