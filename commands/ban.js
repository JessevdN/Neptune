const {RichEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const {parseUser} = require('../util/parseUser.js');
const settings = require('../settings.json');

exports.run = async (client, message, args, con) => {
    const user = message.mentions.users.first();
    if (!user) return;
    parseUser(message, user);
    const modlog = client.channels.find('name', 'mod-log');
    const caseNum = await caseNumber(client, modlog);
    const reason_val = args.splice(1, args.length).join(' ');
    const reason = reason_val || `Awaiting moderator's input. Use ${settings.prefix}reason ${caseNum} <reason>.`;

    if (!modlog) return message.reply('I cannot find a mod-log channel');
    if (message.mentions.users.size < 1) return message.reply('You must mention someone to ban them.').catch(console.error);

    con.query(`INSERT INTO punishments (date_added, guild_id, casenumber, type, reason, moderator, user_id) VALUES ('${Date.now()}', '${message.guild.id}', ${caseNum}, 3, '${reason_val}', '${message.author.tag}', '${user.id}')`, (err, result) => {
        if (err) console.log(err);
    });

    const replyEmbed = new RichEmbed()
        .setColor(0x00AE86)
        .setTimestamp()
        .setDescription(`:x: **${user.tag}** has been banned by **${message.author.tag}**`);
    message.channel.send(replyEmbed).catch(console.error);

    const embed = new RichEmbed()
        .setColor(0x00AE86)
        .setTimestamp()
        .setDescription(`**Action:** Ban\n**Target:** ${user.tag} (${user.id})\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
        .setFooter(`Case ${caseNum}`);
    return client.channels.get(modlog.id).send({embed}).catch(console.error);
    
    //message.guild.ban(user, 1);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 2
};

exports.help = {
    name: 'ban',
    description: 'Bans the mentioned user.',
    usage: 'ban [mention] [reason]'
};