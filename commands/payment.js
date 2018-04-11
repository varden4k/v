const discord = require('discord.js');
const logger = require('../logger.js');
const config = require('../config.js');
const shortid = require('shortid');
const xdate = require('x-date');
const fs = require('fs');
const client = new discord.Client();

let payment = {};

var dateNow = new Date().format('dd/mm/yyyy');

payment.balance = (message, args, client) => {
	message.delete();
	try {
        const balanceCount = fs.readFileSync('balance.txt','utf8');
        message.channel.send({embed: {
            "title": "Stan salda: " + balanceCount + "$",
            "color": 785697,
          }});

        } catch (e) {
            message.channel.send("error!");
        } finally {
			message.delete();
            message.channel.stopTyping(true);
        }
    
    }

    payment.payIn = (message, args, client) => {
        message.delete();
        try {
            if (args.length > 2) {
                let text = '';
                for (i = 2; i < args.length; i++) {
                    text += args[i] + ' ';
                }
        const balanceCount = fs.readFileSync('balance.txt','utf8');

        const sum = parseInt(balanceCount)+parseInt(args[1]);

            fs.writeFile('balance.txt', sum);

            let sayembed = new discord.RichEmbed()
            .setColor('#58A861')
            .setAuthor(`${message.member.displayName}`, message.author.displayAvatarURL)
            .setThumbnail("https://i.imgur.com/S4JdLxB.png")
            .setTimestamp()
            .addField(`STAN:`, sum + "$", true)
            .addField(`POWÓD:`, text, true)
            .addField(`WPŁATA:`, args[1] + "$", true)
            .addField(`DATA:`, dateNow, true)
            message.channel.send(sayembed);
        } else {message.channel.send({embed: {
            "title": "Musisz koniecznie podać powód!",
            "color": 16711709,
          }});}
            } catch (e) {
                message.channel.send("error!");
            } finally {
                message.delete();
                message.channel.stopTyping(true);
            }
        
        }

    payment.payOut = (message, args, client) => {
	message.delete();
	try {
        if (args.length > 2) {
            if (args[1] < 15000) {
            let text = '';
            for (i = 2; i < args.length; i++) {
                text += args[i] + ' ';
            }
        const balanceCount = fs.readFileSync('balance.txt','utf8');

        const sum = parseInt(balanceCount)-parseInt(args[1]);

            fs.writeFile('balance.txt', sum);

            let sayembed = new discord.RichEmbed()
            .setColor('#E75B5D')
            .setAuthor(`${message.member.displayName}`, message.author.displayAvatarURL)
            .setThumbnail("https://i.imgur.com/S4JdLxB.png")
            .setTimestamp()
            .addField(`STAN:`, sum + "$", true)
            .addField(`POWÓD:`, text, true)
            .addField(`WYPŁATA:`, args[1] + "$", true)
            .addField(`DATA:`, dateNow, true)
            message.channel.send(sayembed);
        } else {message.channel.send({embed: {
            "title": "Kwota wypłaty jest zbyt duża!",
            "color": 16711709,
          }});}
        } else {message.channel.send({embed: {
            "title": "Musisz koniecznie podać powód!",
            "color": 16711709,
          }});}

        } catch (e) {
            message.channel.send("error!");
        } finally {
			message.delete();
            message.channel.stopTyping(true);
        }
    
    }

module.exports = payment;