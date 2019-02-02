const ms = require('ms');
const {RichEmbed} = require('discord.js');

exports.run = (client, message, args) => {
    if (!client.lockit) client.lockit = [];
    const time = args.join(' ');
    const validUnlocks = ['release', 'unlock'];
    if (!time) return message.reply('You must set a duration for the lockdown in either hours, minutes or seconds');

    if (validUnlocks.includes(time)) {
        message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: null
        }).then(() => {
            message.channel.send('Lockdown lifted.');
            clearTimeout(client.lockit[message.channel.id]);
            delete client.lockit[message.channel.id];
        }).catch(error => {
            console.log(error);
        });
    } else {
        message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: false
        }).then(() => {
            const replyEmbed = new RichEmbed()
                .setColor(0x00AE86)
                .setTimestamp()
                .setDescription(`Channel locked down for **${ms(ms(time), { long:true })}**`)
                .setFooter(`by ${message.author.tag}`);

            message.channel.send(replyEmbed).then(() => {
                client.lockit[message.channel.id] = setTimeout(() => {
                    const replyEmbed2 = new RichEmbed()
                        .setColor(0x00AE86)
                        .setTimestamp()
                        .setDescription(`Lockdown lifted`);
                    message.channel.overwritePermissions(message.guild.id, {
                        SEND_MESSAGES: null
                    }).then(message.channel.send(replyEmbed2)).catch(console.error);
                    delete client.lockit[message.channel.id];
                }, ms(time));

            }).catch(error => {
                console.log(error);
            });
        });
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['ld'],
    permLevel: 2
};

exports.help = {
    name: 'lockdown',
    description: 'This will lock a channel down for the set duration, be it in hours, minutes or seconds.',
    usage: 'lockdown <duration>'
};