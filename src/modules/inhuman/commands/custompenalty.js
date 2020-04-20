const { send } = require('../../../utils/chat');
const bot = require('../../../bot');
const { RichEmbed } = require('discord.js');
const { userColor } = require('../../../utils/colors');
const { getGuildPrefix } = require('../../../utils/discord');

exports.run = async (msg, args) => {
    let customPenalties = await bot.db.get(msg.guild, 'inhuman.customPenalties');
    if (!Array.isArray(customPenalties)) customPenalties = [];

    if (!args.length) {
        const embed = new RichEmbed()
            .setTitle('Custom penalties for this server:')
            .setColor(userColor(bot.client.user, msg.guild));

        const output = [];
        customPenalties.forEach((penalty, i) => output.push(`**${i+1}.** ${penalty}`));
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

            const removed = customPenalties.splice(index, 1);

            await bot.db.set(msg.guild, 'inhuman.customPenalties', customPenalties);
            await send(msg.channel, `The following penalty has been removed: \`${removed}\``);
        } else if (args[0] === 'add') {
            const added = args.slice(1).join(' ');
            customPenalties.push(added);

            await bot.db.set(msg.guild, 'inhuman.customPenalties', customPenalties);
            await send(msg.channel, `The following penalty was added: \`${added}\``);
        } else {
            await send(msg.channel, 'If you want to add a custom penalty, use `add`, and if you want to delete a custom penalty, use `del`');
            return false;
        }

    }
    return true;
};

const usage = new Map();
usage.set('', 'Lists all custom penalties');
usage.set('add <penalty>', 'Adds the custom penalty as written');
usage.set('del <#>', 'Deletes the custom penalty at #');
exports.usage = usage;

exports.config = {
    name: 'Custom Penalty Management',
    cmd: 'custompenalty',
    alias: ['custompen', 'custompenalties', 'custompenaltys'],
    botPermissions: [], // Permissions needed by the bot to use this command.
    defaultPermissions: ['MANAGE_GUILD'], // Default permissions to use this command by user
    location: 'GUILD_ONLY', // 'GUILD_ONLY', 'DM_ONLY', 'ALL'
    description: 'Control custom penalties',
    debug: false
};
