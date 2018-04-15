const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "/";

client.on('ready', () => {
    console.log('DZIAŁA TEST 123');
    client.user.setActivity('szanty', {type: 'LISTENING'});
});

client.on('message', message => {
    if (msg.content === prefix + 'raz') {
        msg.channel.send('test');
      }
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.TOKEN); 
