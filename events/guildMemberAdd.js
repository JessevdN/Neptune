const Discord = require('discord.js');

module.exports = member => {
    const guild = member.guild;
    guild.channels.get(guild.channels.find('name', 'general').id).send(`Please welcome ${member.user.username} to the server!`);
};