const { send } = require('../../../utils/chat');
const bot = require('../../../bot');
const { userColor } = require('../../../utils/colors');
const { shuffleArray } = require('../../../utils/general');
const { MessageEmbed } = require('discord.js');

exports.run = async (msg, args) => {
    let numPenalties;
    if (args && args[0]) {
        numPenalties = parseInt(args[0], 10);
    }

    if (isNaN(numPenalties)) numPenalties = 3;

    const ogPenalties = await bot.db.get('penalties', 'list');
    const useCustom = await bot.db.get(msg.guild, `inhuman.players.${msg.author.id}.useCustom`);

    let customPenalties = [];
    if (msg.guild && useCustom) {
        customPenalties = await bot.db.get(msg.guild, 'inhuman.customPenalties');
        if (!Array.isArray(customPenalties)) customPenalties = [];
    }

    let penalties = ogPenalties.concat(customPenalties);
    penalties = shuffleArray(penalties);

    const selected = penalties.slice(0, numPenalties);

    const aboutMsg = new MessageEmbed()
        .setColor(userColor(bot.client.user, msg.guild))
        .setTitle('Random penalty options:')
        .setDescription(selected.join('\n'))
        .setFooter('The Investigator eliminates one penalty, then the Subject picks one from the two remaining options');

    send(msg.channel, aboutMsg);
    return true;
};

const usage = new Map();
usage.set('', 'Get 3 random penalties to chose from');
usage.set('<#>', 'Get # random penalties to chose from');
exports.usage = usage;

exports.config = {
    name: 'Get Penalty',
    cmd: 'penalty',
    alias: ['pen', 'penalties', 'penaltys', 'getpenalties', 'getpenalty', 'getpenaltys'],
    botPermissions: [], // Permissions needed by the bot to use this command.
    defaultPermissions: [], // Default permissions to use this command by user
    location: 'ALL', // 'GUILD_ONLY', 'DM_ONLY', 'ALL'
    description: 'Responds with random penalties',
    debug: false
};
