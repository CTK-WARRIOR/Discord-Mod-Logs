const discord = require("discord.js");
const client = new discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"]
});
const {
  TOKEN,
  WELCOME_CHANNEL,
  MOD_CHANNEL,
  SERVER,
  PREFIX
} = require("./config.json");
const { MessageEmbed } = require("discord.js");

client.on("ready", () => {
  console.log("System is just started!!");
});

client.on("message", message => {
  if (message.content === "!ping") {
    return message.channel.send("Pong: there we are 1ms");
  } else if (message.content === "!clean") {
    message.channel.bulkDelete(5);
  }
});

client.on("channelDelete", function(channel) {
  let embed = new MessageEmbed();

  embed
    .setAuthor(
      channel.guild.name + ": Channel Deleted",
      channel.guild.iconURL()
    )
    .setDescription(
      `**#${channel.name}** Just got deleted and it was the **${channel.type}** channel.`
    )
    .setColor("RED");
  return client.channels.cache.get(MOD_CHANNEL).send(embed);
});

client.on("channelCreate", function(channel) {
  let embed = new MessageEmbed();
  embed
    .setAuthor(
      channel.guild.name + ": Channel Created",
      channel.guild.iconURL()
    )
    .setDescription(
      `Someone just created **#${channel.name}** and it is the **${channel.type}** channel.`
    )
    .setColor("GREEN");
  return client.channels.cache.get(MOD_CHANNEL).send(embed);
});

client.on("channelPinsUpdate", function(channel, time) {
  let embed = new MessageEmbed();
  embed
    .setAuthor(channel.guild.name + ": Pins Updated", channel.guild.iconURL())
    .setDescription(
      `Pins of the **#${channel.name}** got updated at **${time}**`
    )

    .setColor("BLUE");
  return client.channels.cache.get(MOD_CHANNEL).send(embed);
});

client.on("channelUpdate", function(oldChannel, newChannel) {
  let embed = new MessageEmbed();
  let channel = oldChannel;
  embed
    .setAuthor(
      channel.guild.name + ": Channel Updated",
      channel.guild.iconURL()
    )
    .setDescription(
      `Some settings of the channel **#${channel.name}** got updated**`
    )

    .setColor("BLUE");
  return client.channels.cache.get(MOD_CHANNEL).send(embed);
});

client.on("emojiCreate", function(emoji) {
  let embed = new MessageEmbed();
  let channel = emoji;
  embed
    .setAuthor(channel.guild.name + ": Emoji Added", channel.guild.iconURL())
    .setDescription(`We have new emoji in the server => (${emoji})`)
    .setColor("GREEN");
  return client.channels.cache.get(MOD_CHANNEL).send(embed);
});

client.on("emojiDelete", function(emoji) {
  let embed = new MessageEmbed();
  let channel = emoji;
  embed
    .setAuthor(channel.guild.name + ": Emoji Removed", channel.guild.iconURL())
    .setDescription(`emoji **${emoji.name}** got removed from the server.`)
    .setColor("RED");
  return client.channels.cache.get(MOD_CHANNEL).send(embed);
});

client.on("emojiUpdate", function(oldEmoji, newEmoji) {
  let embed = new MessageEmbed();
  let channel = oldEmoji;
  embed
    .setAuthor(channel.guild.name + ": Emoji Removed", channel.guild.iconURL())
    .setDescription(`Someone just updated this emoji => **${newEmoji}**`)
    .setColor("RED");
  return client.channels.cache.get(MOD_CHANNEL).send(embed);
});

client.on("guildBanRemove", function(guild, user) {
  let embed = new MessageEmbed();
  embed
    .setAuthor(guild.name + ": Member Unban", guild.iconURL())
    .setDescription(
      `**${user.username}**(\`${user.id}\`) is now unbanned from the server.`
    )
    .setColor("YELLOW");
  return client.channels.cache.get(MOD_CHANNEL).send(embed);
});

client.on("guildBanAdd", function(guild, user) {
  let embed = new MessageEmbed();
  embed
    .setAuthor(guild.name + ": Member Ban", guild.iconURL())
    .setDescription(
      `**${user.username}**(\`${user.id}\`) is now banned from the server.`
    )
    .setColor("GREEN");
  return client.channels.cache.get(MOD_CHANNEL).send(embed);
});

client.on("guildCreate", function(guild) {
  let embed = new MessageEmbed();
  embed
    .setAuthor("New Server: " + guild.name, guild.iconURL())
    .setColor("YELLOW")
    .setDescription(
      `ID: ${guild.id}\nOwner: ${guild.owner.user.username}\nMembers: ${guild.memberCount}\nChannels: ${guild.channels.cache.size}\nRoles: ${guild.roles.cache.size}`
    )
    .setThumbnail(guild.iconURL());

  return client.channels.cache.get(MOD_CHANNEL).send(embed);
});

client.on("guildDelete", function(guild) {
  let embed = new MessageEmbed();
  embed
    .setAuthor("Server Leaved: " + guild.name, guild.iconURL())
    .setColor("RED")
    .setDescription(
      `Bot just leaved another server and server owner was **${guild.owner.user.username}**`
    )
    .setThumbnail(guild.iconURL());
  return client.channels.cache.get(MOD_CHANNEL).send(embed);
});

client.on("guildMemberAdd", function(member) {
  let embed = new MessageEmbed();
  embed
    .setAuthor(`${member.guild.name}: Member Joined`, member.guild.iconURL())
    .setColor("GREEN")
    .setDescription(
      `**${member.user.tag}**(\`${member.id}\`) Joined the server and his/her account was created at **${member.user.createdAt}**`
    );
  return client.channels.cache.get(MOD_CHANNEL).send(embed);
});

client.on("guildMemberRemove", function(member) {
  let embed = new MessageEmbed();
  embed
    .setAuthor(`${member.guild.name}: Member Leaved`, member.guild.iconURL())
    .setColor("RED")
    .setDescription(
      `**${member.user.tag}**(\`${member.id}\`) Leaved the server or being kicked from the server.`
    );
  return client.channels.cache.get(MOD_CHANNEL).send(embed);
});

client.on("guildMembersChunk", function(members, guild) {
  let embed = new MessageEmbed();
  embed
    .setAuthor(`Alert: Member Chunk Received`)
    .setColor("YELLOW")
    .setDescription(
      `A large number of members just joined the server from **${guild.name}** Guild`
    );
  return client.channels.cache.get(MOD_CHANNEL).send(embed);
});

client.on("guildMemberSpeaking", function(member, speaking) {
  let embed = new MessageEmbed();
  embed
    .setAuthor(`${member.guild.name}: Member Speaking`, member.guild.iconURL())
    .setColor("BLUE")
    .setDescription(
      `**${member.user.username}**(\`${member.id}\`) start/stop speaking in voice channel`
    );
  return client.channels.cache.get(MOD_CHANNEL).send(embed);
});

client.on("guildMemberUpdate", function(oldMember, newMember) {
  let member = oldMember;
  let embed = new MessageEmbed();
  embed
    .setAuthor(`${member.guild.name}: Member Updated`, member.guild.iconURL())
    .setColor("BLUE")
    .setDescription(
      `**${member.user.username}**(\`${member.id}\`) Just updated his/her profile, this can include name, status, activity, avatar etc`
    );

  return client.channels.cache.get(MOD_CHANNEL).send(embed);
});

client.on("guildUpdate", function(oldGuild, newGuild) {
  let guild = oldGuild;
  let embed = new MessageEmbed();
  embed
    .setAuthor(`${guild.name}: Server Updated`, guild.iconURL())
    .setColor("BLUE")
    .setDescription(`Server got updated, this can include name, icon, etc`);

  return client.channels.cache.get(MOD_CHANNEL).send(embed);
});

client.on("messageDelete", async function(message) {
  let embed = new MessageEmbed();

  if (message.partial) {
   
    embed
      .setAuthor(
        `${message.guild.name}: Message Deleted`,
        message.guild.iconURL()
      )
      .setColor("RED")
      .setDescription(`One message got deleted in **#${message.channel.name}**`)


    return client.channels.cache.get(MOD_CHANNEL).send(embed);
  }

  embed
    .setAuthor(
      `${message.guild.name}: Message Deleted`,
      message.guild.iconURL()
    )
    .setColor("RED")
    .setDescription(
      `${message.author.username}(\`${message.author.id}\`) deleted message in **#${message.channel.name}**`
    )
    .addField("Deleted Message", message.content || "Unknown Message")
    .setThumbnail(message.author.displayAvatarURL({ format: "jpg" }));

  return client.channels.cache.get(MOD_CHANNEL).send(embed);
});

client.on("messageDeleteBulk", function(messages) {
  let embed = new MessageEmbed();
  embed
    .setAuthor(
      `${messages.array()[0].guild.name}: Message Bulk Delete`,
      messages.array()[0].guild.iconURL()
    )
    .setColor("RED")
    .setDescription(
      `**${messages.array()[0].author.username}**(\`${
        messages.array()[0].author.id
      }\`) deleted **${messages.size}** messages in **#${
        messages.array()[0].channel.name
      }**`
    );

  return client.channels.cache.get(MOD_CHANNEL).send(embed);
});

client.on("messageReactionAdd", async function(messageReaction, user) {
  let message;
  try {
    message = await messageReaction.fetch();
  } catch (err) {
    message = messageReaction;
  }

  let embed = new MessageEmbed();
  embed
    .setAuthor(
      `${message.message.channel.guild.name}: Reaction Added`,
      message.message.channel.guild.iconURL()
    )
    .setColor("BLUE")
    .setDescription(`Reaction added on the message`)
    .addField(
      "Message Information",
      `ID: ${message.message.id}\nContent: ${message.message.content ||
        "Unknown Message"}\nAuthor: ${message.message.author.username ||
        "Undefined"}`
    )
    .addField(
      "Reaction Information",
      `Reacted by: ${user.username}\nID: ${user.id}\nEmoji: ${message._emoji.name}`
    )
    .setThumbnail(user.displayAvatarURL({ formate: "jpg" }));

  return client.channels.cache.get(MOD_CHANNEL).send(embed);
});

client.on("messageReactionRemove", async function(messageReaction, user) {
  let message;
  try {
    message = await messageReaction.fetch();
  } catch (err) {
    message = messageReaction;
  }

  let embed = new MessageEmbed();
  embed
    .setAuthor(
      `${message.message.channel.guild.name}: Reaction Removed`,
      message.message.channel.guild.iconURL()
    )
    .setColor("RED")
    .setDescription(`Reaction removed on the message`)
    .addField(
      "Message Information",
      `ID: ${message.message.id}\nContent: ${message.message.content ||
        "Unknown Message"}\nAuthor: ${message.message.author.username ||
        "Undefined"}`
    )
    .addField(
      "Reaction Information",
      `UnReacted by: ${user.username}\nID: ${user.id}\nEmoji: ${message._emoji.name}`
    )
    .setThumbnail(user.displayAvatarURL({ formate: "jpg" }));

  return client.channels.cache.get(MOD_CHANNEL).send(embed);
});

client.on("messageReactionRemoveAll", function(message) {
  let embed = new MessageEmbed();
  embed
    .setAuthor(
      `${message.guild.name}: All Reaction Removed`,
      message.guild.iconURL()
    )
    .setColor("YELLOW")
    .setDescription(
      `All the reaction of the message got removed in #${message.channel.name} channel`
    );

  return client.channels.cache.get(MOD_CHANNEL).send(embed);
});

client.on("messageUpdate", async function(oldMessage, newMessage) {
  let main = await oldMessage.fetch();
  if (oldMessage.content === newMessage.content) return;
  let message = newMessage;
  let embed = new MessageEmbed();
  embed
    .setAuthor(`${message.guild.name}: Message Edited`, message.guild.iconURL())
    .setColor("YELLOW")
    .setDescription(
      `Message in the **#${message.channel.name}** channel got edited by **${main.author.username}** : [HERE](https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`
    );

  return client.channels.cache.get(MOD_CHANNEL).send(embed);
});

/*client.on("presenceUpdate", function(oldMember, newMember){
   let embed = new MessageEmbed();
  embed.setAuthor(`${oldMember.guild.name}: Status Updated`, oldMember.guild.iconURL()).setColor("BLUE")
  .setDescription(`${oldMember.user.username}(\`${oldMember.user.id}\`) Just updated his presence.`)
  .setThumbnail(oldMember.user.displayAvatarURL({formate: "jpg"}))
  return client.channels.cache.get(MOD_CHANNEL).send(embed);
});*/

client.on("roleCreate", function(role) {
  let embed = new MessageEmbed();

  embed
    .setAuthor(role.guild.name + ": Role Created", role.guild.iconURL())
    .setDescription(
      `Someone just created a new role with name **${role.name}**`
    )
    .setColor("GREEN");
  return client.channels.cache.get(MOD_CHANNEL).send(embed);
});

client.on("roleDelete", function(role) {
  let embed = new MessageEmbed();
  embed
    .setAuthor(role.guild.name + ": Role Deleted", role.guild.iconURL())
    .setDescription(`Someone just deleted an role with name **${role.name}**`)
    .setColor("RED");
  return client.channels.cache.get(MOD_CHANNEL).send(embed);
});

client.on("roleUpdate", function(oldRole, newRole) {
  let description;

  if (oldRole.name === newRole.name) {
    description = `**${oldRole.name}** role just got updated, this can include permission or color`;
  } else {
    description = `**${oldRole.name}** role just got updated and its new name is **${newRole.name}**.`;
  }

  let embed = new MessageEmbed();
  embed
    .setAuthor(oldRole.guild.name + ": Role Update", oldRole.guild.iconURL())
    .setDescription(description)
    .setColor("BLUE");
  return client.channels.cache.get(MOD_CHANNEL).send(embed);
});

client.login(TOKEN);
