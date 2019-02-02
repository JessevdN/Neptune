const {RichEmbed} = require('discord.js');

exports.run = (client, message, args) => {
    const messagecount = parseInt(args.join(' '));

    if (messagecount > 50) {
        const replyEmbed = new RichEmbed()
            .setColor(0x00AE86)
            .setDescription(`You can prune a maximum of 50 messages at a time.`);
        return message.channel.send(replyEmbed);
    }
    message.channel.fetchMessages({
        limit: messagecount + 1
    }).then(messages => message.channel.bulkDelete(messages).catch(console.error));
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 2
};

exports.help = {
    name: 'prune',
    description: 'Prunes {x} amount of messages from a given channel.',
    usage: 'prune <number>'
};