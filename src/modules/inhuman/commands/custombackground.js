const { send } = require('../../../utils/chat');
const bot = require('../../../bot');
const { MessageEmbed } = require('discord.js');
const { userColor } = require('../../../utils/colors');
const { getGuildPrefix } = require('../../../utils/discord');

exports.run = async (msg, args) => {
    let customBackgrounds = await bot.db.get(msg.guild, 'inhuman.customBackgrounds');
    if (!Array.isArray(customBackgrounds)) customBackgrounds = [];

    if (!args.length) {
        const embed = new MessageEmbed()
            .setTitle('Custom backgrounds for this server:')
            .setColor(userColor(bot.client.user, msg.guild));

        const output = [];
        customBackgrounds.forEach((background, i) => output.push(`**${i+1}.** ${background}`));
        embed.setDescription(output.join('\n'));

        let prefixMessage = '';
        if (msg.guild) {
            const guildPrefix = await getGuildPrefix(msg.guild);
            prefixMessage = `To use custom background and penalties with this server, run the command \`${guildPrefix}custom on\``;
        }

        await send(msg.channel, prefixMessage, embed);
    } else {
        if (args[0] === 'del') {
            let index = parseInt(args[1], 10);
            if (isNaN(index)) return false;
            else index--;

            const removed = customBackgrounds.splice(index, 1);

            await bot.db.set(msg.guild, 'inhuman.customBackgrounds', customBackgrounds);
            await send(msg.channel, `The following background has been removed: \`${removed}\``);
        } else if (args[0] === 'add') {
            const added = args.slice(1).join(' ');
            customBackgrounds.push(added);

            await bot.db.set(msg.guild, 'inhuman.customBackgrounds', customBackgrounds);
            await send(msg.channel, `The following background was added: \`${added}\``);
        } else {
            await send(msg.channel, 'If you want to add a custom background, use `add`, and if you want to delete a custom background, use `del`');
            return false;
        }

    }
    return true;
};

const usage = new Map();
usage.set('', 'Lists all custom backgrounds');
usage.set('add <background>', 'Adds the custom background as written');
usage.set('del <#>', 'Deletes the custom background at #');
exports.usage = usage;

exports.config = {
    name: 'Custom background Management',
    cmd: 'custombackground',
    alias: ['custombg', 'custombgs', 'custombackgrounds', 'custombackgrounds'],
    botPermissions: [], // Permissions needed by the bot to use this command.
    defaultPermissions: ['MANAGE_GUILD'], // Default permissions to use this command by user
    location: 'GUILD_ONLY', // 'GUILD_ONLY', 'DM_ONLY', 'ALL'
    description: 'Control custom backgrounds',
    debug: false
};
