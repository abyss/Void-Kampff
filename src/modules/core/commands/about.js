const { send } = require('../../../utils/chat');
const { client } = require('../../../bot');
const { userColor } = require('../../../utils/colors');
const { stripIndents } = require('common-tags');

const RichEmbed = require('discord.js').RichEmbed;

exports.run = async (msg) => {
    const aboutMsg = new RichEmbed()
        .setColor(userColor(client.user, msg.guild))
        .setTitle('Voight-Kampff Tester')
        .setDescription(stripIndents`
            Voight-Kampff is a bot for playing **Inhuman Conditions.**

            **Inhuman Conditions** is a five-minute, two-player game of surreal \
            interrogation and conversational judo, set in the heart of a \
            chilling bureaucracy.

            Each game has one Investigator and one Suspect. Armed only with \
            two stamps and a topic of conversation, the Investigator must \
            figure out whether the Suspect is a Human or a Robot.

            Robots must answer the Investigator's questions without arousing \
            suspicion, but are hampered by some specific malfunction in their \
            ability to converse. They must be clever, guiding the conversation \
            in subtle ways without getting caught.

            Humans may speak freely, but may find this freedom as much curse \
            as gift. There are no right or wrong answers, only suspicious and \
            innocuous ones, and one slip of the tongue could land Humans and \
            Robots alike in the Bureau's Invasive Confirmation Unit. There, \
            alongside Investigators who make improper determinations, they \
            will await further testing...

            **Inhuman Conditions** is designed by Tommy Maranges and Cory \
            O'Brien and illustrated by Mackenzie Schubert.

            See more about the game at [https://robots.management/](https://robots.management/)

            This bot was created by [Abyss#0473](https://abyss.dev) to \
            facilitate in these tests. You can find out more by running the \
            help command.
        `);

    send(msg.channel, aboutMsg);
    return true;
};

exports.usage = new Map();

exports.config = {
    name: 'About',
    cmd: 'about',
    alias: [],
    botPermissions: [], // Permissions needed by the bot to use this command.
    defaultPermissions: [], // Default permissions to use this command by user
    location: 'ALL', // 'GUILD_ONLY', 'DM_ONLY', 'ALL'
    description: 'Responds with information about the Bot and Game',
    debug: false
};
