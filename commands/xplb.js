const {RichEmbed} = require('discord.js');

exports.run = async (client, message, args, con) => {
    con.query(`SELECT username, discriminator, total_xp FROM users ORDER BY total_xp DESC LIMIT 10`, (err, rows) => {
        const embed = new RichEmbed()
            .setColor(0x00AE86)
            .setTitle(`Top XP Leaderboards`)
            .setFooter(`Requested by ${message.author.tag}`)
            .setTimestamp();

        var i = 1;

        for (let row of rows) {
            embed.addField(`[${i}]  ${row.username}#${row.discriminator}`, `${row.total_xp} xp`);
            i++;
        }

        return message.channel.send(embed);
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['xplb'],
    permLevel: 0
};

exports.help = {
    name: 'xpleaderboards',
    description: 'Check the XP leaderboards of the server.',
    usage: 'xpleaderboards'
};