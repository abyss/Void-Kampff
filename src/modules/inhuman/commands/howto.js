const { send } = require('../../../utils/chat');
const bot = require('../../../bot');
const { userColor } = require('../../../utils/colors');
const { MessageEmbed } = require('discord.js');
const { stripIndentsExtra } = require('../../../utils/general');

exports.run = async (msg) => {
    const output = new MessageEmbed()
        .setColor(userColor(bot.client.user, msg.guild))
        .setTitle('How to play Inhuman Conditions with Void-Kampff')
        .addField('Select Module', stripIndentsExtra`
            Both players will need to mutually select a module. \
            To see the different module options, run the \`module\` \
            command.
        `)
        .addField('Select Penalty', stripIndentsExtra`
            Run the \`penalty\` command to get three random penalties. \
            The Investigator should eliminate one of the penalty options. Then \
            the Subject should tell the Investigator which of the two they \
            wish to use.
        `)
        .addField('Get Investigator Prompts', stripIndentsExtra`
            The Investigator should run the command \`investigator MODULE\`, \
            replacing \`MODULE\` with the name of your chosen module. The \
            Investigator will be sent several direct messages with the \
            prompts for the module. It may take a moment for all of the \
            messages to arrive, give it a moment.
        `)
        .addField('Get Subject Card', stripIndentsExtra`
            The Subject should run the command \`subject MODULE\`, replacing \
            \`MODULE\` with the name of your chosen module. You will be sent a role \
            card via direct message. Keep this secret. Investigator, I assure \
             you they are ~~robot~~ **human**.
        `)
        .addField('Select a Background', stripIndentsExtra`
            Run the \`background\` command to get three random \
            backgrounds. The Subject should pick from one of these to \
            develop their personality and to help demonstrate their humanity.
        `)
        .addField('~~Interference Task~~  Moment of Silence', stripIndentsExtra`
            In lieu of an Interference Task, which has been performed \
            automatically for you, please have a moment of silence for our \
            fallen ~~robot~~ **human** brethren of the Robot War, and to allow \
            the Subject time to read their card at a human-like speed.
        `)
        .addField('Prepare a Timer', stripIndentsExtra`
            Both players should synchronize a timer for 5 minutes, but should \
            not press 'start' yet. If you need a timer, consult your favorite \
            Internet search engine.
        `)
        .addField('Final steps', stripIndentsExtra`
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
