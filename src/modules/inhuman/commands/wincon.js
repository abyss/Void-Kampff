const { send } = require('../../../utils/chat');

const winconMatrix = 'https://i.imgur.com/tI1s7Zs.png';

exports.run = async (msg) => {
    await send(msg.channel, { files: [winconMatrix] });
    return true;
};

exports.usage = new Map();

exports.config = {
    name: 'Get Wincon Matrix',
    cmd: 'wincon',
    alias: ['win', 'matrix'],
    botPermissions: [], // Permissions needed by the bot to use this command.
    defaultPermissions: [], // Default permissions to use this command by user
    location: 'ALL', // 'GUILD_ONLY', 'DM_ONLY', 'ALL'
    description: 'Displays the wincon matrix image',
    debug: false
};
