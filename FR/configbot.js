var configbot = {
    // Salon nouveaux
    Snouv: function (message, serveur, fs, serveurs) {
        if (message.member.hasPermission("KICK_MEMBERS")) {
            try {
                serveur.salonarrivants = message.content.split(" ").slice(1).join(" ").replace("<#", "").replace(">", "");
                var coco = message.guild.channels.get(serveur.salonarrivants);
                String(coco)
                message.channel.send("Salon nouveaux arrivants réglé sur : #" + coco.name);
                serveur.nomsalonarrivants = coco.name
                if (serveur.activationmsgbienvenue == false) {
                    serveur.activationmsgbienvenue = true;
                }
            } catch (e) {
                message.channel.send("Salon non trouvé ! Celui ci doit être déclaré sous cette forme: -snouv #NomSalon")
            }
        } else message.channel.send("Vous devez avoir les permissions Administrateur pour pouvoir utiliser cette commande !")
    },
    // Msgnouv
    MsgNouv: function (message, serveur, Discord) {
        if (message.member.hasPermission("KICK_MEMBERS")) {
            serveur.msgbienvenue = message.content.split(" ").slice(1).join(" ");
            var NomDuNouvelUtilisateur = "*****NomDuNouvelUtilisateur*****";
            var nomreplace = serveur.msgbienvenue.replace(/000/g, NomDuNouvelUtilisateur);
            try {
                const nouvmsgnew = new Discord.RichEmbed()
                    .setAuthor("Message de bienvenue modifié :")
                    .setColor(0x0AE86)
                    .addField("Msg : ", nomreplace, false)
                message.channel.send(nouvmsgnew);
            } catch (e) {
                message.channel.send("Erreur, message vide ou trop long ! (limite : 1024 caractères)")
                serveur.msgbienvenue = "Désactivé"
            }
        } else message.channel.send("Vous devez avoir les permissions Administrateur pour pouvoir utiliser cette commande !")
    },
    // Modif Prefix
    SetPrefix: function (message, serveur) {
        if (message.member.hasPermission("KICK_MEMBERS")) {
            serveur.prefix = message.content.split(" ").slice(1);
            message.channel.send("Nouveau préfix du bot : " + serveur.prefix);
        } else message.channel.send("Vous devez avoir les permissions Administrateur pour pouvoir utiliser cette commande !")
    },
    // Desactivation msg bvn
    BvnOff: function (serveur, message) {
        if (message.member.hasPermission("KICK_MEMBERS")) {
            serveur.activationmsgbienvenue = false;
            serveur.salonarrivants = "Désactivé";
            serveur.salonpartants = "Désactivé"
            message.channel.send("Message d'accueil aux nouveaux arrivants désactivé !");
        } else message.channel.send("Vous devez avoir les permissions Administrateur pour pouvoir utiliser cette commande !")
    },
    // Activation msg partants
    APartants: function (message, serveur) {
        if (message.member.hasPermission("KICK_MEMBERS")) {
            if (serveur.activationmsgbienvenue == true) {
                serveur.salonpartants = true
                message.channel.send("Message des personnes quittant le serveur activé ! Le message sera posté dans le même salon que celui du message de bienvenue (vérifiez donc que vous l'ayez activé avant).")
                return;
            }
            else message.channel.send("Vous devez d'abord définir un salon où mettre le message de bienvenue")
        } else message.channel.send("Vous devez avoir les permissions Administrateur pour pouvoir utiliser cette commande !")
    },
    // Désactivation msg partants
    DPartants: function (message, serveur) {
        if (message.member.hasPermission("KICK_MEMBERS")) {
            serveur.salonpartants = false
            message.channel.send("Message des personnes quittant le serveur déactivé !")
        } else message.channel.send("Vous devez avoir les permissions Administrateur pour pouvoir utiliser cette commande !")
    },
    // Stats bot
    StatsBot: function (message, serveur, Discord) {
        const accueilbot = new Discord.RichEmbed()
            .setAuthor("Config nouveaux arrivants :")
            .setColor(0x0AE86)
            .addField("Salon bienvenue : #", serveur.nomsalonarrivants, false)
            .addField("Message de bienvenue : ", serveur.msgbienvenue, false)
            .addField("Rôle donné par défaut : ", serveur.rolearrivants, false)
            .addField("Salon partants : ", serveur.salonpartants, false)
            .setFooter("-h Accueil pour configurer cette partie")

        const configbot = new Discord.RichEmbed()
            .setAuthor("Config Rôles :")
            .setColor(0x0AE86)
            .addField("Admin bot : ", serveur.adminbot, true)
            .addField("Modo bot : ", serveur.modobot, true)
            .addField("Salon talktorole : ", serveur.salontalktorole, true)

            .addField("Message pour rôle 1 : ", serveur.autorole1, true)
            .addField("Message pour rôle 2 : ", serveur.autorole2, true)
            .addField("Message pour rôle 3 : ", serveur.autorole3, true)

            .addField("Rôle 1 : ", serveur.msgtorole1, true)
            .addField("Rôle 2 : ", serveur.msgtorole2, true)
            .addField("Rôle 3 : ", serveur.msgtorole3, true)
            .setFooter("-h Roles pour configurer cette partie")
        message.channel.send(accueilbot);
        message.channel.send(configbot);
        return;
    }
}
module.exports = configbot;