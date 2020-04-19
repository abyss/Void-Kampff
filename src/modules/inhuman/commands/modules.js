const { send } = require('../../../utils/chat');
const bot = require('../../../bot');
const { modules } = require('../index');
const { userColor } = require('../../../utils/colors');
const { RichEmbed } = require('discord.js');

exports.run = async (msg) => {
    const moduleList = new RichEmbed()
        .setColor(userColor(bot.client.user, msg.guild))
        .setTitle('Together decide from these modules:');

    modules.forEach((module) => {
        if (module.hidden) return;
        moduleList.addField(module.name, module.description, true);
    });

    send(msg.channel, moduleList);
    return true;
};

exports.usage = new Map();

exports.config = {
    name: 'List Modules',
    cmd: 'modules',
    alias: ['module', 'mod', 'mods'],
    botPermissions: [], // Permissions needed by the bot to use this command.
    defaultPermissions: [], // Default permissions to use this command by user
    location: 'ALL', // 'GUILD_ONLY', 'DM_ONLY', 'ALL'
    description: 'Get the list of modules you can use',
    debug: false
};
