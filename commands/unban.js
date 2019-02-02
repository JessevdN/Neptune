const {RichEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const {parseUser} = require('../util/parseUser.js');
const settings = require('../settings.json');

exports.run = (client, message, args) => {
    client.unbanAuth = message.author;
    const user = args[0];
    const modlog = client.channels.find('name', 'mod-log');

    if (!modlog) return message.reply('I cannot find a mod-log channel');
    if (!user) return message.channel.send( new RichEmbed()
                                            .setColor(0x00AE86)
                                            .setDescription(`**${message.author}** you must enter a user id to unban them.`));
    message.channel.send(replyEmbed).catch(console.error);

    //message.guild.unban(user);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 2
};

exports.help = {
    name: 'unban',
    description: 'Unbans the user.',
    usage: 'unban [mention]'
};