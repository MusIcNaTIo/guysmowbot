const Discord = require('discord.js');

const client = new Discord.Client();

var prefix = "!";


client.on("ready", () => {
  console.log("Je suis connecté");
  client.user.setActivity("être programmé");
})

client.on('message', message => {
    if(message.content === "Bonjour"){
        message.channel.send("Salut");
        console.log('Le bot dit bonjour')
    }
    if(message.content === prefix + "aide"){
      var help_embed = new Discord.RichEmbed()
      .setColor("#FF0000")
      .setTitle("Voici mes commandes d'aide :")
      .setDescription("Voici les commandes disponibles")
      .addField("!aide", "Affiche les commandes du Bot")
      .addField("Bonjour", "Le bot répond !")
      .addField("!info", "Voir les informations concernant le serveur et **MOI**")
      .addField("Autres :", "D'autres commandes arrivent prochainement :wink:"  )
      .setFooter("Mon créateur est NRV | Guysmow#5384")
      message.channel.send(help_embed);
      console.log("Menu d'aide ouvert avec succès")
    }
    if(message.content === prefix + "info") {
      var info_embed = new Discord.RichEmbed()
   .setColor("#FFFFFF")
   .setTitle("Information à propos du serveur : ")
   .addField(":robot: Nom:", `${client.user.tag}`, true)
   .addField(":bust_in_silhouette: Créateur:", "NRV | Guysmow#5384")
   .addField("Mon Tag :hash::", `#${client.user.discriminator}`)
   .addField("Nombre de membres :", message.guild.members.size)
   .addField("Nombre de catégories et de salons :", message.guild.channels.size)
   .setFooter("Commande créée par NRV | Guysmow#5384")
   message.channel.send(info_embed)
   console.log("Les informations d'un serveur ont été trouvés avec succès!")
}

if (!message.content.startsWith(prefix)) return;

var args = message.content.substring(prefix.lenght).split(" ");

switch (args[0].toLowerCase()) {
  case "statistiques" :

  var userCreateDate = message.author.createdAt.toString().split(" ");
  var msgauthor = message.author.id;

  var stats_embed = new Discord.RichEmbed()

  .setColor("#FF0000")
  .setTitle(`Vos informations personnelles : ${message.author.username}`)
  .addField(`ID de l'utilisateur :id:`, msgauthor, true)
  .addField(`Date de création de l'utilisateur : `, userCreateDate[1] + ' ' + userCreateDate[2] + ' ' + userCreateDate[3])
  .setThumbnail(message.author.avatarURL);
  message.reply("Tu peux regarder tes messages privés, tu vient de reçevoir tes informations personnnelles !");
  message.author.send(stats_embed);
  break;
}



});

client.on('message', message => {
    if (message.content === "Ca va ?"){
        message.channel.send("Ca va super et toi ?");
        console.log('Commande avec succès')
    }
});

client.login(process.env.TOKEN);
