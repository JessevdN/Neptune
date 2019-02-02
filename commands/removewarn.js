const {RichEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const {parseUser} = require('../util/parseUser.js');
const settings = require('../settings.json');

exports.run = async (client, message, args, con) => {
    const modlog = client.channels.find('name', 'mod-log');
    const caseNum = args[0];

    if (!caseNum) return message.channel.send( new RichEmbed()
                                            .setColor(0x00AE86)
                                            .setDescription(`**${message.author}** please provide a valid casenumber.`));
    if (!modlog) return message.reply('I cannot find a mod-log channel');

    con.query(`SELECT * FROM punishments WHERE casenumber = ${caseNum} AND deleted = 0`, (err, result) => {
        if (err) console.log(err);

        if (result.length == 0) {
            return message.channel.send( 
                new RichEmbed()
                    .setColor(0x00AE86)
                    .setDescription(`**${message.author}** that casenumber was not found or is already deleted.`)
            );
        } else {
            con.query(`UPDATE punishments SET deleted = 1 WHERE casenumber = ${caseNum}`, (err, result) => {
                if (err) console.log(err);
            });

            message.react('✅');

            const embed = new RichEmbed()
                .setColor(0x00AE86)
                .setTimestamp()
                .setDescription(`:wastebasket: Case ${caseNum} has been removed by **${message.author.tag}**`);

            return client.channels.get(modlog.id).send({
                embed
            });            
        }
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['rw'],
    permLevel: 2
};

exports.help = {
    name: 'removewarn',
    description: 'Removes a warning with the given casenumber.',
    usage: 'removewarn [casenumber]'
};