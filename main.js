const config = require('./config.js');
const accept = require('./commands/accept.js');
let loadstart = new Date();

var running = false;

const discord = require('discord.js');
const client = new discord.Client();
var CronJob = require('cron').CronJob;

const prefix = '/';

client.on('ready', () => {
	client.user.setActivity(config.settings.game);
	client.user.setUsername("Lem0n");
	client.user.setAvatar('https://images.vice.com/vice/images/galleries/meta/2014/11/26/la-gang-photos-andres-herren-876-665-1417023573.jpg');

	if (running == false) {
		console.log("Bot running! (Took: " + ((new Date()).getTime() - loadstart.getTime()) + " ms)");
		running = true;
	}

});

client.on('guildMemberAdd', member => {

	member.addRole('433032769841659904')

});

client.on('message', async message => {
	if (message.author.bot) return;

	var server;
	if (message.channel.type == "text") {
		server = message.guild.name;
	} else {
		server = "Private Message";
	}
	if (server === "Private Message") {
		if (message.content.startsWith(prefix)) {
			console.log(`[${server}] ${message.author.username} issued bot command: ${message.content}`);
		} else {
			console.log(`[${server}] ${message.author.username} text: ${message.content}`);
		}
	} else {
		if (message.content.startsWith(prefix)) {
			console.log(`[${server}] ${message.author.username} issued bot command: ${message.content}`);
		}
	}
		let args = message.content.toLowerCase().split(/ +/);
		switch (args[0]) {
			case '/wypierdol':
			if (message.author.id == 186724346675462144) {
				let messagecount = parseInt(args[1]);
				  message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
				} else { message.channel.send('nie jestes vardenem');}
				break;
			case '/dodaj':
				accept.dodawanie(message, args, client);
				break;
			case '/los':
			if (isNaN(args[1])) { message.channel.send('podaj liczbe baranie'); } else {
			message.channel.send(Math.floor(Math.random()*args[1]));
		}

				break;
			case 'pliszka':
			var wiadomosc = [`to jebana kurwa`, `szmata jebana`, `nie pierdolcie o tej kurwie bo mi sie niedobrze robi`, `jebana suka pierdolona`, `chuj jej w kurwe dziwce`, `to pierdolona szmata`, `to zajebana dziwka`, `nienawidze tej kurwy`]
			var random = wiadomosc[Math.floor(Math.random()*wiadomosc.length)]
			message.channel.send(`${random}`)
				break;
			case 'kruszon':
				message.channel.send('kruszon daj pakiet');
				break;
			case 'sewraino':
				message.channel.send('to jebany kurwa snitch pierdolony');
				break;
			case 'rozumiem':
				accept.acccept(message, client);
				break;
			// case 'xd':
			// message.channel.send({embed: {
			// 	"title": "Dwie zasady, które musisz poznać, zanim zaczniesz korzystać z innych kanałów. Tutaj będą za to lecieć dwa razy większe kary niż miałoby to miejsce normalnie.",
			// 	"footer": {
			// 		"text": 'Jeżeli to zrozumiałeś, możesz wpisać na czacie poniżej "Zrozumiałem".'
			// 	  },
			// 	  "fields": [
			// 		{
			// 		  "name": "Pierwsza",
			// 		  "value": "Zakaz robienia jakiegokolwiek MG.",
			// 		  "inline": true
			// 		},
			// 		{
			// 			"name": "Druga",
			// 			"value": "Zakaz odwalania.",
			// 			"inline": true
			// 		},
			// 	  ],
			// 	"color": 16711709,
			//   }});
			//   break;
			case 'bricktown':
				message.channel.send('jebac kurwa bricktown czarnuszku soo woo');
				break;
		}
});

new CronJob('*/15 * * * *', function() {
	let spam = client.channels.find("id", `430722672440377346`)
    var wiadomosc = [`Lem0n jest zajebisty!`, `Co tam czarnuszku?`, `to ja lem0n`, `moge inva?`, `igor`, `budowa`]
    var random = wiadomosc[Math.floor(Math.random()*wiadomosc.length)]
    spam.send(`${random}`)
}, null, true, 'Europe/Warsaw');

client.login(process.env.TOKEN);
