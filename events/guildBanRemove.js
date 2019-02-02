const Discord = require('discord.js');

module.exports = (guild, user) => {
    const embed = new Discord.RichEmbed()
        .setColor(0x00AE86)
        .setTimestamp()
        .setDescription(`**Action:** Unban\n**Target:** ${user.tag} (${user.id})\n**Moderator:** ${guild.client.unbanAuth.tag}\n`);

    return guild.channels.get(guild.channels.find('name', 'mod-log').id).send({
        embed
    });
};