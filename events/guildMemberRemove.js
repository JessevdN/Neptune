const Discord = require('discord.js');

module.exports = member => {
    const guild = member.guild;
    guild.channels.get(guild.channels.find('name', 'general').id).send(`Please say goodbye to ${member.user.username} we will miss you!`);
};