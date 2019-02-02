const chalk = require('chalk');
module.exports = client => {
    var currentdate = new Date();
    console.log('');
    console.log(chalk.bgGreen.black('-------------------------------------------------'));
    console.log(chalk.bgGreen.black(' Hideyoshi Bot by Viducius - All rights reserved '));
    console.log(chalk.bgGreen.black(`   [${currentdate.getDate() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " " + currentdate.getHours() + ":" + (currentdate.getMinutes() < 10 ? "0" : "" ) + currentdate.getMinutes() + ":" + (currentdate.getSeconds() < 10 ? "0" : "" ) + currentdate.getSeconds()}] ${client.user.username} is running!   `));
    console.log(chalk.bgGreen.black('-------------------------------------------------'));
};