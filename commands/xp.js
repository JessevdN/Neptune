const {RichEmbed} = require('discord.js');
const {parseUser} = require('../util/parseUser.js');

exports.run = async (client, message, args, con) => {
    if (args.length != 0) {
        const user = message.mentions.users.first() || client.users.get(args[0]);
        if (user == null) {
            const replyEmbed = new RichEmbed()
                .setColor(0x00AE86)
                .setDescription(`User not found.`);
            return message.channel.send(replyEmbed).catch(console.error);
        }

        con.query(`SELECT total_xp FROM users WHERE user_id = '${user.id}'`, (err, rows) => {
            if (rows.length < 1) {
                const replyEmbed = new RichEmbed()
                    .setColor(0x00AE86)
                    .setTitle(`${user.username}`)
                    .setDescription(`User not found or user hasn't obtained xp yet.`);
                return message.channel.send(replyEmbed).catch(console.error);
            }

            let xp = rows[0].total_xp;

            const replyEmbed = new RichEmbed()
                .setColor(0x00AE86)
                .setThumbnail(`${user.avatarURL}`)
                .setTitle(`${user.username}`)
                .setDescription(`${xp} xp`);

            return message.channel.send(replyEmbed).catch(console.error);
        });
    } else {
        con.query(`SELECT total_xp FROM users WHERE user_id = '${message.author.id}'`, (err, rows) => {
            if (rows.length < 1) {
                const replyEmbed = new RichEmbed()
                    .setColor(0x00AE86)
                    .setTitle(`${message.author.username}`)
                    .setDescription(`User not found or user hasn't obtained xp yet.`);
                return message.channel.send(replyEmbed);
            }

            let xp = rows[0].total_xp;

            const replyEmbed = new RichEmbed()
                .setColor(0x00AE86)
                .setThumbnail(`${message.author.avatarURL}`)
                .setTitle(`${message.author.username}`)
                .setDescription(`${xp} xp`);

            return message.channel.send(replyEmbed).catch(console.error);
        });
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'xp',
    description: 'Check users amount of XP earned.',
    usage: 'xp [mention]'
};