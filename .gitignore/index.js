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
      .addField("!clear", "Supprime le nombre de messages mis après la commande, néccésite la permission de supprimer les messages")
      .addField("!kick", "Avec les permissions nécéssaires, vous pouvez exclure quelqu'un")
      .addField("!ban", "Avec les permissions nécéssaires, vous pouvez bannir quelqu'un")
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

var args = message.content.substring(prefix.length).split(" ");

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
if(message.content.startsWith(prefix + "clear")){
  if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGE")) return message.channel.send(`:no_entry:  ${message.author}, je pense que vous n'avez pas les permissions nécessaires pour ça. ツ:no_entry:`);

   let args = message.content.split(" ").slice(1);

   if(!args[0]) return message.channel.send(` ${message.author}, :no_entry: Il faut préciser le nombre de messages à supprimer ! (Maximum 100 messages):no_entry:`)
   message.channel.bulkDelete(args[0]).then(() => {
       message.channel.send(`:white_check_mark: ${args[0]} message(s) a/ont bien été supprimé(s) avec succès ! Vous pouvez à présent supprimer ce message! (commande par NRV | Guysmow) :white_check_mark:`);
   console.log("Des messages ont été supprimés avec succès!")}) 
}
if(message.content.startsWith(prefix + "kick")){
  if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.channel.send("Vous n'avez pas la permission de Kick");

  if(message.mentions.user === 0){
    return message.channel.send("Vous devez mentionnez un utilisateur !")
  }
  var kick = message.guild.member(message.mentions.users.first());
  if(!kick) {
    return message.channel.send("Je ne sais pas si l'utilisateur existe ou si vous en avez mentionné un :/")
  }
  if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")){
    return message.channel.send("Je n'ai pas la permission pour kick !");
  
  kick.kick().then(member => {
    message.channel.send(`**${member.user.username}** est kick par **${message.author.username}**`);
  });
}

if(message.content.startsWith(prefix + "ban")){
  if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send("Vous n'avez pas la permission de ban un utilisateur");

  if(message.mentions.users.size === 0){
    return message.channel.send("Vous devez mentionnez un utilisateur :wink:")
  }

  var ban = message.guild.member(message.mentions.users.first());
  if(!ban){
    return message.channel.send("Je ne sais pas si l'utilisateur existe");

  }
  if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")){
    return message.channel.send("Je n'ai pas la permission de ban cet utilisateur");
  }
  ban.ban().then(member => {
    message.channel.send(`**${member.user.username}** est ban par **${message.author.username}** !`);
  }

  )}
  if(message.content.startsWith(prefix + "mute")) {
    if(!message.guild.member(message.author).hasPermission("MANAGE_ROLES")) return message.channel.send("Vous n'avez pas la permission !");

    if(message.mentions.users.size === 0) {
        return message.channel.send('Vous devez mentionner un utilisateur !');
    }

    var mute = message.guild.member(message.mentions.users.first());
    if(!mute) {
        return message.channel.send("Je n'ai pas trouvé l'utilisateur ou il l'existe pas !");
    }

    if(!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.channel.send("Je n'ai pas la permission !");
    message.channel.overwritePermissions(mute, {SEND_MESSAGES: false}).then(member => {
        message.channel.send(`${mute.user.username} est mute !`);
    })
}


}});

client.on('message', message => {
    if (message.content === "Ca va ?"){
        message.channel.send("Ca va super et toi ?");
        console.log('Commande avec succès')
    }
});


client.login(process.env.TOKEN);
