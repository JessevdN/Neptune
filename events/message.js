const {generateXp} = require('../util/generateXp.js');
const settings = require('../settings.json');
const mysql = require('mysql2');

module.exports = message => {
    const client = message.client;    
    if (message.author.bot) return;

    const con = mysql.createConnection({
        host: settings.mysqlHost,
        user: settings.mysqlUser,
        password: settings.mysqlPass,
        database: settings.mysqlDB
    });
    
    con.query(`SELECT * FROM users WHERE user_id = '${message.author.id}'`, (err, rows) => {
        if(err) throw err;

        let sql;

        if(rows.length < 1) {
            sql = `INSERT INTO users (user_id, username, discriminator, total_xp) VALUES ('${message.author.id}', '${message.author.username}', '${message.author.discriminator}', ${generateXp()})`;
        } else {
            let xp = rows[0].total_xp;
            sql = `UPDATE users SET total_xp = ${xp + generateXp()} WHERE user_id = '${message.author.id}'`;
        }

        con.query(sql);
    });

    if (!message.content.startsWith(settings.prefix)) return;

    const command = message.content.split(' ')[0].slice(settings.prefix.length);
    const params = message.content.split(' ').slice(1);
    const perms = client.elevation(message);

    let cmd;

    if (client.commands.has(command)) {
        cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
        cmd = client.commands.get(client.aliases.get(command));
    }

    if (cmd) {
        if (perms < cmd.conf.permLevel) return;
        cmd.run(client, message, params, con);

        con.query(`UPDATE settings SET command_counter = command_counter + 1 WHERE id = 1`, (err, result) => {
            if (err) throw err;
        });
    }
};