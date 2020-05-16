const { send } = require('../../../utils/chat');
const bot = require('../../../bot');
const { userColor } = require('../../../utils/colors');
const { MessageEmbed } = require('discord.js');
const { shuffleArray } = require('../../../utils/general');

exports.run = async (msg, args) => {
    let modules = await bot.db.get('modules', 'list');
    // Remove all hidden modules
    modules = modules.filter((module) => !module.hidden);

    const moduleList = new MessageEmbed()
        .setColor(userColor(bot.client.user, msg.guild))
        .setTitle('Together decide from these modules:');

    if (!args.length) {
        modules.forEach((module) => {
            moduleList.addField(module.name, module.description, true);
        });
    } else {
        const num = parseInt(args[0], 10);
        if (isNaN(num)) {
            await send(msg.channel, 'Invalid number');
            return false;
        }

        shuffleArray(modules);

        const selected = modules.slice(0, num);
        selected.forEach((module) => {
            moduleList.addField(module.name, module.description, true);
        });
    }

    send(msg.channel, moduleList);
    return true;
};

const usage = new Map();
usage.set('', 'Get the list of all modules');
usage.set('<#>', 'Respond with # random modules');
exports.usage = usage;

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
