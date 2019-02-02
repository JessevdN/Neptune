const {RichEmbed} = require('discord.js');
const {parseUser} = require('../util/parseUser.js');

exports.run = async (client, message, args, con) => {
    const user = message.mentions.users.first();
    parseUser(message, user);

    if (message.mentions.users.size < 1) return message.reply('You must mention someone to check their history.').catch(console.error);

    con.query(`SELECT * FROM punishments WHERE user_id = ${user.id}`, (err, rows) => {
        const embed = new RichEmbed()
            .setColor(0x00AE86)
            .setTimestamp()
            .setFooter(`Warnings:`);
    });

    const embed = new RichEmbed()
        .setColor(0x00AE86)
        .setTimestamp()
        .setDescription(`**Action:** Kick\n**Target:** ${user.tag} (${user.id})\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
        .setFooter(`Case ${caseNum}`);
    return client.channels.get(modlog.id).send({
        embed
    });
};

exports.conf = {
    enabled: false,
    guildOnly: false,
    aliases: [],
    permLevel: 2
};

exports.help = {
    name: 'history',
    description: 'Check a users punishment history.',
    usage: 'history [mention]'
};