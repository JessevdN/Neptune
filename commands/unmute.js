const {RichEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const {parseUser} = require('../util/parseUser.js');
const settings = require('../settings.json');

exports.run = async (client, message, args) => {
    const user = message.mentions.users.first();
    parseUser(message, user);
    const modlog = client.channels.find('name', 'mod-log');
    const caseNum = await caseNumber(client, modlog);
    const muteRole = client.guilds.get(message.guild.id).roles.find('name', 'Punished slave');
    if (!modlog) return message.reply('I cannot find a mod-log channel').catch(console.error);
    if (!muteRole) return message.reply('I cannot find a mute role').catch(console.error);
    if (message.mentions.users.size < 1) return message.reply('You must mention someone to unmute them.').catch(console.error);
    const timeperiod = args.splice(1, args.length);
    const reason = args.splice(2, args.length).join(' ') || `Awaiting moderator's input. Use ${settings.prefix}reason ${caseNum} <reason>.`;

    const embed = new RichEmbed()
        .setColor(0x00AE86)
        .setTimestamp()
        .setDescription(`**Action:** Unmute\n**Target:** ${user.tag} (${user.id})\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
        .setFooter(`Case ${caseNum}`);

    const replyEmbed = new RichEmbed()
        .setColor(0x00AE86)
        .setTimestamp()
        .setDescription(`🔊 **${user.tag}** has been unmuted by **${message.author.tag}**`);

    if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('I do not have the correct permissions.').catch(console.error);

    if (message.guild.member(user).roles.has(muteRole.id)) {
        message.guild.member(user).removeRole(muteRole).then(() => {
            client.channels.get(modlog.id).send({embed}).catch(console.error);
        });
        message.channel.send(replyEmbed).catch(console.error);
    } else {
        return message.reply('User is not muted').catch(console.error);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 2
};

exports.help = {
    name: 'unmute',
    description: 'Unmutes a mentioned user.',
    usage: 'unmute [mention] [timeperiod] [reason]'
};
