const { send } = require('../../../utils/chat');
const bot = require('../../../bot');
const { userColor } = require('../../../utils/colors');
const { RichEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

exports.run = async (msg) => {
    const output = new RichEmbed()
        .setColor(userColor(bot.client.user, msg.guild))
        .setTitle('How to play Inhuman Conditions via Void-Kampff')
        .addField('Select Module', stripIndents`
            Both players will need to mutually select a module. \
            You can see which modules exist to select from by running \
            the \`module\` command.
        `)
        .addField('Select Penalty', stripIndents`
            Run the \`penalty\` command to receive three random penalties. \
            The investigator eliminates one of the penalty options, and the \
            subject picks a penalty from the remaining two. Make sure both \
            players have a clear understanding of the penalty, as humans would.
        `)
        .addField('Get Investigator Prompts', stripIndents`
            The Investigator should run the command \`investigator MODULE\`, \
            replacing \`MODULE\` with the name of the selected module. The \
            investigator will receive several private messages with the \
            prompts for the module. It may take a moment for all of the \
            messages to arrive, be patient.
        `)
        .addField('Get Subject Card', stripIndents`
            The subject should run the command \`subject MODULE\`, replacing \
            \`MODULE\` with the name of the selected module to receive a role \
            card via private message. Investigator, I assure you they are \
            ~~robot~~ **human**.
            `)
        .addField('~~Inteference Task~~ Moment of Silence', stripIndents`
            In lieu of an Interference Task, which has been performed \
            automatically for you, please have a moment of silence for our \
            fallen ~~robot~~ **human** brethren, and to allow the subject time to \
            read their card at human-like speeds.
        `)
        .addField('Select a Background', stripIndents`
            Run the  \`background\` command to receive three random \
            backgrounds. The subject should pick from one of these to \
            develop their personality and to demonstrate their humanity.
        `)
        .addField('Prepare a Timer', stripIndents`
            Find a way to syncronize a 5 minute timer for both players. \
            Prepare the timer, but do not start it yet. If you need \
            suggestions, feel free to ask other humans on your server.
        `)
        .addField('Final steps', stripIndents`
            Once all of the above is prepared, you are ready to start. \
            See the final instructions by running the \`begin\` command.
        `);

    await send(msg.channel, output);
    return true;
};

exports.usage = new Map();

exports.config = {
    name: 'How To Use Void-Kampff',
    cmd: 'howto',
    alias: ['how', 'setup'],
    botPermissions: [], // Permissions needed by the bot to use this command.
    defaultPermissions: [], // Default permissions to use this command by user
    location: 'ALL', // 'GUILD_ONLY', 'DM_ONLY', 'ALL'
    description: 'Learn how to use Void-Kampff',
    debug: false
};
