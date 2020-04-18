const { send } = require('../../../utils/chat');
const bot = require('../../../bot');
const { parseBoolean } = require('../../../utils/general');

exports.run = async (msg, args) => {
    let useCustom;

    if (args.length) {
        useCustom = parseBoolean(args[0]);
        await bot.db.set(msg.author.id, 'inhuman.useCustom', useCustom);
    } else {
        useCustom = await bot.db.get(msg.author.id, 'inhuman.useCustom');
    }

    if (useCustom) {
        send(msg.channel, 'You **are** using custom sets! If you would like to turn them off, run this command with "off".');
    } else {
        send(msg.channel, 'You are **not** using custom sets! If you would like to turn them off, run this command with "on".');
    }

    return true;
};

const usage = new Map();
usage.set('', 'Responds with whether or not you are using custom sets');
usage.set('<on|off>', 'Turns using custom sets on/off for yourself');
exports.usage = usage;

exports.config = {
    name: 'Custom Sets',
    cmd: 'custom',
    alias: ['usecustom'],
    botPermissions: [], // Permissions needed by the bot to use this command.
    defaultPermissions: [], // Default permissions to use this command by user
    location: 'ALL', // 'GUILD_ONLY', 'DM_ONLY', 'ALL'
    description: 'Control custom set usage',
    debug: false
};
