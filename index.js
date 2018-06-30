//// INITIALISATIONS
// librairies
const Discord = require('discord.js'),
  client = new Discord.Client(),
  token = ,
  jimp = require('jimp'),
  fs = require("fs"),
  ytdl = require('ytdl-core'),
  YouTube = require('simple-youtube-api'),
  youtube = new YouTube(),

  // Ressources
  Autre = require('./Autre'),
  general = require('./FR/general'),
  configbot = require('./FR/configbot'),

  serveurs = require("./BDD/serveur.json"),
  users = require("./BDD/users.json"),
  images = require("./BDD/images.json"),
  compteurs = require("./BDD/compteurs.json");

// Fonctions
var servers = {};
function play(connection, message) {
  var server = servers[message.guild.id];
  const streamOptions = { seek: 0, volume: 1 },
    stream = ytdl(server.queue[0], { filter: 'audioonly' });
  server.dispatcher = connection.playStream(stream, streamOptions)
  server.queue.shift();
  server.dispatcher.on("end", function () {
    if (server.queue[0]) play(connection, message);
    else connection.disconnect()
  });
}

function Jsonsave(i) {
  setTimeout(() => {
    fs.writeFile("./BDD/serveur.json", JSON.stringify(serveurs), function (err) { if (err) throw err; })
    fs.writeFile("./BDD/users.json", JSON.stringify(users), function (err) { if (err) throw err })
    console.log("Jsons sauvegardés")
      Jsonsave(++i);
  }, 5000)
}

Jsonsave(0);

//// EVENTS
client.on('ready', () => {console.log("Démarré")}); // Demarrage bot
client.on('guildMemberAdd', nouveaumembre => Autre.Nouveaumembre(nouveaumembre, serveurs, Discord)); // Nouveau Membre
client.on('guildMemberRemove', exmembre => Autre.Exmembre(exmembre, serveurs, Discord)); // Membre parti
client.on('message', message => { // Message

  //// DECLARATION VARIABLES DE L'EVENT MESSAGE
  var sender = message.author;

  //// JSONs
  //  message.channel.send(message.attachments[url])
  if (!serveurs[message.guild.id]) Autre.JsonServeur(serveurs, message) // Json Serveur
  if (!users[sender.id]) Autre.JsonUsers(message, sender, users, fs) // Json Users

  // Variables depuis json
  var msg = message.content.toUpperCase(),
    args = msg.split(" "),
    serveur = serveurs[message.guild.id],
    user = users[sender.id],
    prefix = serveur.prefix,
    compteur = compteurs["compteurs"],
    image = images["Images"],
    empl1,
    empl2,
    empl3,
    empl4,
    maison = [":maison:",1],
    labo = [":laboratoire:",0],
    chateau = [":c_:"];


  if (message.author.bot) return;
  else {
    //// NOM INCONNU
    if (msg == (prefix + "CONFIG")){ general.ConfigPC(message) // Memoire botix + "SEMOJI")) general.EmojiServ(message) // Liste emojis serv
    let totalSeconds = (client.uptime / 1000);
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = totalSeconds % 60;
            let uptime = `${hours} h ${minutes} min ${seconds} s`;
            message.channel.send("Up depuis : "+uptime)}
    else if (msg == (prefix + "LSAY")) message.channel.send("Dernière utilisation du 'say' : " + serveur.lastsay + "\n" + serveur.lastsaymsg) // Log say
    else if (msg == (prefix + "CRASH") && ((sender.id == "298208225185103884") || (sender.id == "304344502976512002"))) var bite = require("./bite.json"); // Crash
    else if (msg.startsWith(prefix + "SAY")) general.Say(message), serveur.lastsay = sender.username, serveur.lastsaymsg = message.content.split(" ").slice(1).join(" ") // Say
    else if (msg.startsWith("+")) {
      // general.Vote(message) // Reactions du bot    

      var imagesT = ['https://cdn.glitch.com/593808d2-3710-4c21-8b3f-3bc66cd765b3%2Fwallpaper.jpg?1530205776036', sender.displayAvatarURL];
      var jimps = [];
      for (var i = 0; i < imagesT.length; i++) {
        jimps.push(jimp.read(imagesT[i]));
      }
      Promise.all(jimps).then(function (data) {
        return Promise.all(jimps);
      }).then(function (data) {
        data[1].resize(32, 32)
        data[0].resize(128, 128)
          .composite(data[1], 64, 64);

        data[0].write('final.jpg', function () {
        });
      });

      setTimeout(function fonction() {
        const copie = new Discord.Attachment("final.jpg");
        message.channel.send(copie);
      }, 2000);
    }
    //// IMAGES
    else if (msg.startsWith(prefix + "KISS")) general.Kiss(message, compteur, image, sender, Autre, Discord)
    else if (msg.startsWith(prefix + "HUG")) general.Hug(message, compteur, image, sender, Autre, Discord)
    else if (msg.startsWith(prefix + "PAT")) general.Pat(message, compteur, image, sender, Autre, Discord)
    else if (msg.startsWith(prefix + "SLAP")) general.Slap(message, compteur, image, sender, Autre, Discord)
    else if (msg.startsWith(prefix + "PUNCH")) general.Punch(message, compteur, image, sender, Autre, Discord)
    else if (msg.startsWith(prefix + "LICK")) general.Lick(message, compteur, image, sender, Autre, Discord, Discord)
    else if (msg.startsWith(prefix + "KILL")) general.Kill(message, compteur, image, sender, Autre, Discord)
    else if (msg.startsWith(prefix + "WASTED")) general.Wasted(message, compteur, image, sender, Autre, Discord)
    else if (msg == (prefix + "ECCHI")) general.Ecchi(message, compteur, image, Autre, Discord)

    //// MUSIQUE
    else if (msg.startsWith(prefix + "PLAY")) Autre.Musique(message, servers, play, youtube, Discord, users, sender, args)
    else if (msg == (prefix + "SKIP")) Autre.Skip(message, servers)
    else if (msg == (prefix + "STOP")) Autre.Stop(message, servers)
    //// INFOS
    else if (msg == (prefix + "BOTINFO")) general.Botinfo(message, client, Discord, client) // Info serv
    else if (msg == (prefix + "MYINFO")) general.Myinfo(message, Discord, sender) // Info moi
    else if (msg.startsWith(prefix + "INFO")) general.Info(message, Discord, user) // Info User
    //// CONFIG BOT
    else if (msg == (prefix + "BVN_OFF")) configbot.BvnOff(serveur, message) // Désactivation msg bvn
    else if (msg == (prefix + "MPARTANTS_ON")) configbot.APartants(message, serveur) // Activation msg partants
    else if (msg == (prefix + "MPARTANTS_OFF")) configbot.DPartants(message, serveur) // Désactivation msg partants
    else if (msg == (prefix + "BOT_STATS")) configbot.StatsBot(message, serveur, Discord) // Stats bot
    else if (msg == (prefix + "HELP")) Autre.Help(message, Discord, client)
    else if (msg.startsWith(prefix + "SNOUV")) configbot.Snouv(message, serveur) // Salon Bienvenue
    else if (msg.startsWith(prefix + "MSGNOUV")) configbot.MsgNouv(message, serveur, Discord) // Message d'accueil
    else if (msg.startsWith(prefix + "SET_PREFIX")) configbot.SetPrefix(message, serveur) // Changer prefix

    //// LEVELING
    else if (msg.startsWith(prefix + "MYLEVEL")) general.Mylevel(message, user, Discord, sender)
    else {
      user.xp = user.xp + 1
      user.totalxp = user.totalxp + 1
      if (user.xp >= user.nlvl) Autre.Leveling(message, user, users, Discord, fs)

    };

    //// FIN DE CODE


    // A quoi le bot joue
    client.user.setPresence({ game: { name: "*help", type: 0 } });

  } // Fin du else (anti message bot) 
}); //Fin event msg



client.login(token);
