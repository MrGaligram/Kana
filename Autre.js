var Autre = {
  //// Nouvel arrivant
  Nouveaumembre: function (nouveaumembre, serveurs, Discord) {
    var serveur = serveurs[nouveaumembre.guild.id];
    var nouv = nouveaumembre.user.username;
    if (serveur.activationmsgbienvenue == true) { // Si le serv a activé le msg de bienvenue
      setTimeout(function fonction() {
        var salonbienvenue = nouveaumembre.guild.channels.find("name", serveur.nomsalonarrivants);
        const msgnew = new Discord.RichEmbed()
          .setAuthor(serveur.msgbienvenue.replace(/000/g, nouv))
          .setColor(0x0AE86)
        salonbienvenue.send(msgnew);
        return;
      }, 500);
    } else return;
  },
  //// Partant du serv
  Exmembre: function (exmembre, serveurs, Discord) {
    var serveur = serveurs[exmembre.guild.id];
    var exmec = exmembre.user.username;
    let sender = exmembre.author;
    if (serveur.activationmsgbienvenue == true) {
      if (serveur.salonpartants == true) {
        setTimeout(function fonction() {
          var salonpartant = exmembre.guild.channels.find("name", serveur.nomsalonarrivants);
          const msgex = new Discord.RichEmbed()
            .setAuthor(exmec + " est parti, RIP !")
            .setColor(0x00000)
          salonpartant.send(msgex);
          return;
        }, 500);
      }
      else return;
    }
  },
  //// Inscription Serveur.JSON
  JsonServeur: function (serveurs, message) {
    serveurs[message.guild.id] = {
      servername: message.guild.name,
      activationmsgbienvenue: false,
      nomsalonarrivants: "Désactivé",
      salonpartants: 'Désactivé  ', // Salon où le nom des gens quittant le serv
      msgbienvenue: "Bienvue à toi sur le serveur", // Message laissé aux nouveaux arrivant dans le salon des arrivants
      prefix: "*",
      lastsay: "", // Nom dernier sayeur
      lastsaymsg: "", // message dernier sayeur
    }
  },
  //// Inscription Users.JSON
  JsonUsers: function (message, sender, users, fs) {
    users[sender.id] = {
      username: sender.username,
      xp: 0,
      totalxp: 0,
      lvl: 0,
      nlvl: 10000
    }
    setTimeout(function fonction() {
      fs.writeFile("./BDD/users.json", JSON.stringify(users), function (err) {
        if (err) throw err
      })
    }, 2000);
  },
  // Système de leveling
  Leveling: function (message, user, users, Discord, fs) {
    user.lvl = user.lvl + 1
    user.xp = user.xp + 1
    const msglevel = new Discord.RichEmbed()
      .setAuthor("Vous avez atteint le niveau : " + user.lvl + " !")
      .setColor(0x086AE)
    message.channel.send(msglevel)

    if (user.lvl <= 10) {
      user.nlvl = user.nlvl * 1.4
    } else if (user.lvl <= 20) {
      user.nlvl = (user.lvl * 1.45)
    } else {
      user.nlvl = (user.lvl * 1.5)
    }

    user.totalxp = user.xp
    user.xp = 0
    user.nlvl = Math.round(user.nlvl)
    setTimeout(function fonction() {
      fs.writeFile("./BDD/users.json", JSON.stringify(users), function (err) {
        if (err) throw err
      })
    }, 2000);
  },
  //// Musique
  Musique: function (message, servers, play, youtube, Discord, users, sender, args) { // Commande play
    if (!args[1]) {
      message.reply("Veuillez mettre un titre ou une URL"); // Si le mec n'a pas mis de titre ou d'url
      return;
    }

    else if (!message.member.voiceChannel) {
      message.reply("Vous devez être dans un salon vocal pour effectuer cette commande"); // Si le mec n'est dans aucun salon vocal
      return;
    }
    else {
      if (!servers[message.guild.id]) servers[message.guild.id] = {
        queue: []
      }
      var lien = message.content.split(" ").slice(1).join()
      var titremusique = "Pas de titre trouvé";
      var urlmusique = "Pas d'url trouvée";
      var nbmusiqueenqueue = 0;

      setTimeout(function fonction() {
        youtube.searchVideos(lien, 1)
          .then(results => {
            var user = users[sender.id];
            titremusique = `${results[0].title}`;
            urlmusique = `${results[0].url}`;
          })
      }, 500);

      setTimeout(function fonction() {
        var server = servers[message.guild.id];
        server.queue.push(urlmusique);
        const musiquelancee = new Discord.RichEmbed()
          .setAuthor("Musique ajoutée par (" + sender.tag + ")", message.author.avatarURL)
          .setColor(0xFF88FF)
          .setThumbnail("https://cdn.discordapp.com/attachments/426529340474392596/442824207190065152/580b57fcd9996e24bc43c545.png")
          .addField("Titre : ", titremusique, true)
          .addField("Lien  :", urlmusique, true)
        message.channel.send(musiquelancee);
        nbmusiqueenqueue = nbmusiqueenqueue + 1

        if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function (connection) {
          play(connection, message);
        })
      }, 1000);
      return
    }
  },
  // Musique suivante
  Skip: function (message, servers) {
    var server = servers[message.guild.id];
    if (server.dispatcher) server.dispatcher.end();
    return;
  },
  // Musique arrêt
  Stop: function (message, servers) {
    var server = servers[message.guild.id];
    if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
    return;
  },
  // Embed Images
  Embimg: function (titre, couleur, img, message, Discord) {
    const embedimage = new Discord.RichEmbed()
      .setAuthor(titre)
      .setColor(couleur)
      .setImage(img)

    message.channel.send(embedimage)
  },
  // Aide
  Help: function (message, Discord, client) {
    var question = "https://cdn.pixabay.com/photo/2016/06/26/23/32/information-1481584_960_720.png"
    var configurationim = "http://www.myiconfinder.com/uploads/iconsets/256-256-5fbc60a4335d01cd9c35dcf8fae02410.png"
    const generalhelp = new Discord.RichEmbed()
      .setAuthor("Général")
      .setColor(0xFF88FF)
      .setThumbnail(client.user.avatarURL)
      .addField("Faire parler le bot :", "say *texte*", true)
      .addField("Log say : ", "lsay", true)
      .addField("Emojis serv : ", "semoji", true)
      .addField("Emojis bot : ", "bemoji", true)
      .addField("Votes : ", "prefix+espace+*Vote*", true)
      .addField("Lancer musique : ", "play *titre musique*", true)
      .addField("Skip musique : ", "skip", true)
      .addField("Arrêter musique : ", "stop", true)
    const infohelp = new Discord.RichEmbed()
      .setAuthor("Infos")
      .setColor(0xFF88FF)
      .setThumbnail(question)
      .addField("Config hébergeur bot : ", "config", true)
      .addField("Uptime bot : ", "up", true)
      .addField("Info utilisateur : ", "info *@utilisateur*", true)
      .addField("Info sur soi : ", "myinfo", true)
      .addField("Info bot : ", "botinfo", true)
    const confbothelp = new Discord.RichEmbed()
      .setAuthor("Configuration bot")
      .setColor(0xFF88FF)
      .setThumbnail(configurationim)
      .addField("Configurer le salon d'accueuil des nouveaux : ", "snouv #*nomdusalon*", false)
      .addField("Configurer le message d'accueil (000 pour 'nom du membre') : ", "msgnouv", false)
      .addField("Modifier le prefix du bot : ", "set_prefix", false)
      .addField("Désactiver le message d'accueil : ", "bvn_off", false)
      .addField("Activer msg des membres qui partent (même salon que celui d'accueil) : ", "mpartants_on", false)
      .addField("Desactiver msg des membres qui partent : ", "mpartants_off", false)
      .addField("Etat de configuration du bot : ", "bot_stats", false)
    const images = new Discord.RichEmbed()
      .setAuthor("Images")
      .setColor(0xFF88FF)
      //.setThumbnail(question)
      .addField("Gif", "gif *tag en anglais*", true)
      .addField("Hentai : ", "hentai", true)
      .addField("Ecchi", "ecchi", true)
      .addField("Embrasser @", "kiss", true)
      .addField("Faire un calin à @*", "hug", true)
      .addField("Tapoter @", "pat", true)
      .addField("Giffler @", "slap", true)
      .addField("Frapper @", "punch", true)
      .addField("Lécher*@", "lick", true)
      .addField("Fail", "wasted", true)
      .addField("Tuer @", "kill", true)

    message.channel.send(generalhelp);
    message.channel.send(infohelp);
    message.channel.send(confbothelp);
    message.channel.send(images);
  }

}
module.exports = Autre; // Nécessaire ! Exportation du Say.js