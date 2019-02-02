const {RichEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const {parseUser} = require('../util/parseUser.js');
const settings = require('../settings.json');

exports.run = async (client, message, args, con) => {
    const user = message.mentions.users.first();
    parseUser(message, user);

    const modlog = client.channels.find('name', 'mod-log');
    const caseNum = await caseNumber(client, modlog);
    const reason = args.splice(1, args.length).join(' ');

    if (!reason) return message.reply('Please define a reason.')
    if (!modlog) return message.reply('I cannot find a mod-log channel');
    if (message.mentions.users.size < 1) return message.reply('You must mention someone to warn them.').catch(console.error);

    con.query(`INSERT INTO punishments (date_added, guild_id, casenumber type, reason, moderator, user_id) VALUES ('${Date.now()}', '${message.guild.id}', ${caseNum}, 1, '${reason}', '${message.author.tag}', '${user.id}')`, (err, result) => {
        if (err) console.log(err);
    });

    const replyEmbed = new RichEmbed()
        .setColor(0x00AE86)
        .setTimestamp()
        .setDescription(`:warning: **${user.username}** has been warned by **${message.author.username}**`)
        .setFooter(`Reason: ${reason}`);
    message.channel.send(replyEmbed).catch(console.error);

    const embed = new RichEmbed()
        .setColor(0x00AE86)
        .setTimestamp()
        .setDescription(`**Action:** Warning\n**Target:** ${user.tag} (${user.id})\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
        .setFooter(`Case ${caseNum}`);
        
    return client.channels.get(modlog.id).send({
        embed
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 2
};

exports.help = {
    name: 'warn',
    description: 'Issues a warning to the mentioned user.',
    usage: 'warn [mention] [reason]'
};