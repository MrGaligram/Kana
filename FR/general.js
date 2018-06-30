var general = {
    // Mon niveau
    Mylevel: function (message, user, Discord, sender) {
        let xprestant = user.nlvl - user.xp
        const mylevel = new Discord.RichEmbed()
            .setAuthor(sender.tag, sender.avatarURL)
            .setColor(0x086AE)
            .setThumbnail(sender.avatarURL)
            .addField("Niveau :", "`LVL " + user.lvl + "`", true)
            .addField("Progression :", "`" + user.xp + " / " + xprestant + " XP`", true)
            .addField("XP total : ", user.totalxp, true)
        message.channel.send(mylevel);
    },
    // Say
    Say: function (message) {
        let say = message.content.split(" ").slice(1).join(" ");
        message.delete();
        String(say);

        setTimeout(function fonction() {
            message.channel.send(say)
        }, 100);
    },
    //// Memoire bot
    ConfigPC: function (message) {
        const arr = [1, 2, 3, 4, 5, 6, 9, 7, 8, 9, 10];
        arr.reverse();
        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        message.channel.send(`Le bot utilise environs : ${Math.round(used * 100) / 100} MB de RAM`)
        
    },
    //// EmojiServ
    EmojiServ: function (message) {
        const emojiList = message.guild.emojis.map(e => e.toString()).join(" ");
        message.channel.send("Liste des emojis du serveur : \n" + emojiList);
    },
    //// Vote
    Vote: function (message) {
        setTimeout(function fonction() {
            message.react("👍")
        }, 500);
        setTimeout(function fonction() {
            message.react("👎")
        }, 1000);

        return;
    },
    // Infoserv
    Botinfo: function (message, client, Discord, client) {
        var nbgens = client.users.size
        var nbserveurs = client.guilds.size
        let totalSeconds = (client.uptime / 1000);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        let uptime = `${hours} h ${minutes} min ${seconds} s`;
        const info = new Discord.RichEmbed()
            .setAuthor("Kana bot", client.user.avatarURL)
            .setColor(0xFF88FF)
            .setThumbnail(client.user.avatarURL)
            .setFooter("Kana-Bot installée sur : " + nbserveurs + " serveurs" + "\nAvec : " + nbgens + " utilisateurs")
            .addField("Nom :", client.user.username, true)
            .addField("Discrim : ", client.user.discriminator, true)
            .addField("Propriétaire : ", "MrGaligram", true)
            .addField("Crée le :", client.user.createdAt, false)
            .addField("En fonctionnement depuis : ", uptime, false)
        message.channel.send(info)
        return;
    },
    // Myinfo
    Myinfo: function (message, Discord, sender) {
        let ipresence = "inconnue";
        message.delete();
        var output = ""
        for (var i = 1; i < message.guild.roles.map(role => role.name).length; i++) {
            var mec = message.guild.members.get(sender.id);
            var role = message.guild.roles.map(role => role.id)[i];
            if (mec.roles.get(role)) {
                output += message.guild.roles.map(role => role.name)[i] + "\n";
            }
        }
        if (sender.presence.status == "online") { ipresence = "En ligne" };
        if (sender.presence.status == "offline") { ipresence = "Hors ligne" };
        if (sender.presence.status == "idle") { ipresence = "Inactif" };
        if (sender.presence.status == "dnd") { ipresence = "Ne pas deranger" };
        const info = new Discord.RichEmbed()
            .setAuthor("Informations Utilisateur (" + sender.tag + ")", message.author.avatarURL)
            .setColor(0xFF88FF)
            .setThumbnail(message.author.avatarURL)
            .setFooter("ID : " + sender.id + (" (Kana Bot by MrGaligram)"), "https://cdn.discordapp.com/attachments/426529340474392596/431828553198469120/26225488_178481876084770_1977287777825325056_n.jpg")
            .addField("Nom Utilisateur :", sender.username, true)
            .addField("Discrim : ", sender.discriminator, true)
            .addField("Statut : ", ipresence, true)
            .addField("Roles : ", output, true)
            .addBlankField()
            .addField("Date de création Compte : ", sender.createdAt, true);
        message.channel.send(info);
        return;
    },
    // Info
    Info: function (message, Discord, user) {
        let ipresence = "inconnue";
        message.delete();
        var args = [message.content.split(" ").slice(1).join(" ")];
        if (!args[0]) return message.reply("Veuillez tagger quelqu'un !");
        if (message.mentions.users.first()) {
            user = message.mentions.users.first();
            if (user.presence.status == "online") { ipresence = "En ligne" };
            if (user.presence.status == "offline") { ipresence = "Hors ligne" };
            if (user.presence.status == "idle") { ipresence = "Inactif" };
            if (user.presence.status == "dnd") { ipresence = "Ne pas deranger" };
            const info = new Discord.RichEmbed()
                .setAuthor("Informations Utilisateur (" + user.tag + ")", user.avatarURL)
                .setColor(0xFF88FF)
                .setThumbnail(user.avatarURL)
                .setFooter("ID : " + user.id + (" (Kana Bot by MrGaligram)"), "https://cdn.discordapp.com/attachments/426529340474392596/431828553198469120/26225488_178481876084770_1977287777825325056_n.jpg")
                .addField("Nom Utilisateur :", user.username, true)
                .addField("Discrim : ", user.discriminator, true)
                .addField("Statut : ", ipresence, true)
                .addBlankField()
                .addField("Date de création Compte : ", user.createdAt, true);
            message.channel.send(info);
            return;
        }
    },
    // Kiss
    Kiss: function (message, compteur, image, sender, Autre, Discord) {
        var kiss = compteur.kiss,
            imgal = Math.floor(Math.random() * kiss),
            couleur = '0xFF88FF',
            img = image.kiss[imgal];
        if (message.mentions.users.first()) {
            var personne = message.mentions.users.first(),
                titre = sender.username + " embrasse " + personne.username;
        } else { var titre = sender.username + " fait des bisous" }
        Autre.Embimg(titre, couleur, img, message, Discord)
    },
    // Hug
    Hug: function (message, compteur, image, sender, Autre, Discord) {
        var hug = compteur.hug,
            imgal = Math.floor(Math.random() * hug),
            couleur = '0xFF88FF',
            img = image.hug[imgal];
        if (message.mentions.users.first()) {
            var personne = message.mentions.users.first(),
                titre = sender.username + " fait un calin à " + personne.username;
        } else { var titre = sender.username + " donne des calins" }
        Autre.Embimg(titre, couleur, img, message, Discord)
    },
    // Pat
    Pat: function (message, compteur, image, sender, Autre, Discord) {
        var pat = compteur.pat,
            imgal = Math.floor(Math.random() * pat),
            couleur = '0xFF88FF',
            img = image.pat[imgal];
        if (message.mentions.users.first()) {
            var personne = message.mentions.users.first(),
                titre = sender.username + " tapotte " + personne.username;
        } else { var titre = sender.username + " tapote des gens dans la rue" }
        Autre.Embimg(titre, couleur, img, message, Discord)
    },
    // Slap
    Slap: function (message, compteur, image, sender, Autre, Discord) {
        var slap = compteur.slap,
            imgal = Math.floor(Math.random() * slap),
            couleur = '0xFF88FF',
            img = image.slap[imgal];
        if (message.mentions.users.first()) {
            var personne = message.mentions.users.first(),
                titre = sender.username + " giffle " + personne.username;
        } else { var titre = sender.username + " giffle des gens" }
        Autre.Embimg(titre, couleur, img, message, Discord)
    },
    // Punch
    Punch: function (message, compteur, image, sender, Autre, Discord) {
        var punch = compteur.punch,
            imgal = Math.floor(Math.random() * punch),
            couleur = '0xFF88FF',
            img = image.punch[imgal];
        if (message.mentions.users.first()) {
            var personne = message.mentions.users.first(),
                titre = sender.username + " frappe " + personne.username;
        } else { var titre = sender.username + " frappe tout le monde sur son passage" }
        Autre.Embimg(titre, couleur, img, message, Discord)
    },
    // Lick
    Lick: function (message, compteur, image, sender, Autre, Discord) {
        var lick = compteur.lick,
            imgal = Math.floor(Math.random() * lick),
            couleur = '0xFF88FF',
            img = image.lick[imgal];
        if (message.mentions.users.first()) {
            var personne = message.mentions.users.first(),
                titre = sender.username + " lèche " + personne.username;
        } else { var titre = sender.username + " se lèche" }
        Autre.Embimg(titre, couleur, img, message, Discord)
    },
    // Kill
    Kill: function (message, compteur, image, sender, Autre, Discord) {
        var kill = compteur.kill,
            imgal = Math.floor(Math.random() * kill),
            couleur = '0xFF88FF',
            img = image.kill[imgal];
        if (message.mentions.users.first()) {
            var personne = message.mentions.users.first(),
                titre = sender.username + " tue " + personne.username;
        } else { var titre = sender.username + " tue des gens" }
        Autre.Embimg(titre, couleur, img, message, Discord)
    },
    // Wasted
    Wasted: function (message, compteur, image, sender, Autre, Discord) {
        var wasted = compteur.wasted,
            imgal = Math.floor(Math.random() * wasted),
            couleur = '0xFF88FF',
            img = image.wasted[imgal],
            titre = sender.username + " s'est fail";
        Autre.Embimg(titre, couleur, img, message, Discord)
    },
    // Ecchi
    Ecchi: function (message, compteur, image, Autre, Discord) {
        var ecchi = compteur.ecchi,
            imgal = Math.floor(Math.random() * ecchi),
            couleur = '0xFF88FF',
            img = image.ecchi[imgal],
            titre = "";
        Autre.Embimg(titre, couleur, img, message, Discord)
    }
}
module.exports = general;