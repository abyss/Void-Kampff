const { RichEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const Fuse = require('fuse.js');

const bot = require('../../../bot');
const { modules } = require('../index');
const { send } = require('../../../utils/chat');
const { shuffleArray, asyncForEach } = require('../../../utils/general');

const findModule = function (moduleText) {
    const options = {
        shouldSort: true,
        threshhold: 0.3, // between 0 (perfect) to 1 (complete mismatch)
        location: 0,
        distance: 100,
        maxPatternLength: 20,
        minMatchCharLength: 1,
        keys: [
            'key',
            'name',
        ]
    };

    const fuse = new Fuse(modules, options);
    const results = fuse.search(moduleText);
    return results[0].item;
};

exports.run = async (msg, args) => {
    const taskKeyColor = 'fef65b'; // Yellow
    const promptColor = '1cbe6a'; // Green
    const whilePromptColor = '566cc3'; // Blue

    if (args.length < 1) {
        send(msg.channel, 'Please include a module to receive your prompts. You can run the `module` command to find out your options.');
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

    const taskKey = new RichEmbed()
        .setColor(taskKeyColor)
        .setTitle(stripIndents`${module.full_name} Inteference Task Key (Read before you start the timer)`)
        .setDescription(module.intro);

    await send(msg.author, taskKey);

    const subjectPrompts = module.prompts;
    shuffleArray(subjectPrompts);

    await asyncForEach(subjectPrompts, async (prompt) => {
        const examples = prompt.examples
            .map((ex, i) => `**${String.fromCharCode(65 + i)}.** ${ex}`)
            .join('\n');
        const description = `*Suggested prompts:* \n${examples}`;
        const embed = new RichEmbed()
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
        const embed = new RichEmbed()
            .setColor(whilePromptColor)
            .setTitle(`${prompt.requirement}`)
            .setDescription(description)
            .setFooter('While fulfulling another prompt, subject must answer to be a human');

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