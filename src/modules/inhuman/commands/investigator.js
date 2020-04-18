const { send } = require('../../../utils/chat');
const bot = require('../../../bot');
const { RichEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const { shuffleArray, asyncForEach } = require('../../../utils/general');
exports.run = async (msg, args) => {
    const taskKeyColor = 'fef65b'; // Yellow
    const promptColor = '1cbe6a'; // Green
    const whilePromptColor = '566cc3'; // Blue

    const module = await bot.db.get('modules', 'small_talk');

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
