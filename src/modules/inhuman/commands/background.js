const { send } = require('../../../utils/chat');
const bot = require('../../../bot');
const { userColor } = require('../../../utils/colors');
const { shuffleArray } = require('../../../utils/general');

const RichEmbed = require('discord.js').RichEmbed;

exports.run = async (msg, args) => {
    let numBackgrounds;
    if (args && args[0]) {
        numBackgrounds = parseInt(args[0], 10);
    }

    if (isNaN(numBackgrounds)) numBackgrounds = 3;

    const ogBackgrounds = await bot.db.get('backgrounds', 'list');
    const useCustom = await bot.db.get(msg.author.id, 'inhuman.useCustom');

    let customBackgrounds = [];
    if (msg.guild && useCustom) {
        customBackgrounds = await bot.db.get(msg.guild, 'inhuman.customBackgrounds');
        if (!Array.isArray(customBackgrounds)) customBackgrounds = [];
    }

    const backgrounds = ogBackgrounds.concat(customBackgrounds);
    shuffleArray(backgrounds);

    const selected = backgrounds.slice(0, numBackgrounds);

    const aboutMsg = new RichEmbed()
        .setColor(userColor(bot.client.user, msg.guild))
        .setTitle('Choose one of these backgrounds:')
        .setDescription(selected.join('\n'));

    send(msg.channel, aboutMsg);
    return true;
};

const usage = new Map();
usage.set('', 'Get 3 random backgrounds to chose from');
usage.set('<#>', 'Get # random backgrounds to chose from');
exports.usage = usage;

exports.config = {
    name: 'Get Background',
    cmd: 'background',
    alias: ['getbackground', 'bg'],
    botPermissions: [], // Permissions needed by the bot to use this command.
    defaultPermissions: [], // Default permissions to use this command by user
    location: 'ALL', // 'GUILD_ONLY', 'DM_ONLY', 'ALL'
    description: 'Responds with random backgrounds',
    debug: false
};
