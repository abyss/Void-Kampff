const { send } = require('../../../utils/chat');
const bot = require('../../../bot');
const { userColor } = require('../../../utils/colors');
const { RichEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

exports.run = async (msg) => {
    const output = new RichEmbed()
        .setColor(userColor(bot.client.user, msg.guild))
        .setTitle('How to start Inhuman Conditions via Void-Kampff')
        .addField('Preparation', stripIndents`
            If you didn't follow the instructions in the \`howto\` command, \
            please ensure you have prepared: a **module**, the **penalty**, \
            Investigator **prompts**, the Subject **role card**, the Subject \
            **background**, and a **timer**.

            If you do not know how to do that, see the \`howto\` command.
        `)
        .addField('Beginning Procedure', stripIndents`
            Investigator, do the following:
            **1.** Ask the Subject to state their name and background.
            **2.** Ask the Subject to calibrate the penalty by performing it three times.
            **3.** Read the introduction card that was sent along with the prompts aloud.
            **4.** When both players are ready, start the timer and the investigation.
        `)
        .addField('During the interview', stripIndents`
            **-** Ask the questions in any order.
            **-** Control the flow of the interview. It is your job to determine \
            if the Subject is a human or a robot before the timer is over.
        `)
        .addField('Ending the game', stripIndents`
            **-** At any time, if you believe the Subject is a robot, you can \
            stop the timer and send them to the Invasive Confirmation Unit for \
            further testing.
            **-** At the end of the timer, **ask one final question.** After \
            their answer, stamp the Subject **HUMAN** or **ROBOT**.
            **-** Be wary; sending a human to the Invasive Confirmation Unit will \
            result in harsh discipline. We accept only the best investigators!
        `);

    await send(msg.channel, output);
    return true;
};

exports.usage = new Map();

exports.config = {
    name: 'Begin an Inhuman Conditions Game',
    cmd: 'begin',
    alias: ['start'],
    botPermissions: [], // Permissions needed by the bot to use this command.
    defaultPermissions: [], // Default permissions to use this command by user
    location: 'ALL', // 'GUILD_ONLY', 'DM_ONLY', 'ALL'
    description: 'Get the beginning prompt and instructions',
    debug: false
};
