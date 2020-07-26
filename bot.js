//=============================== - [ Consts ] - ===================================

const Discord = require("discord.js");
const client = new Discord.Client();
const cmd = require("node-cmd");
const http = require("http");
const express = require("express");
const app = express();
const ms = require("ms");
const fs = require("fs");
const moment = require("moment");
const request = require("request");
const dateFormat = require("dateformat");
const r1 = require("snekfetch");
const jimp = require("jimp");
const child_process = require("child_process");
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PROT);
setInterval(() => {
  http.get(`http://tonybahez.glitch.me/`);
}, 280000);
let developers = ["561923346028036096"];
const admin = "h!";
const prefix = "h!";

//=============================== - [ Bot ] - ===================================

client.on("ready", () => {
  client.user.setActivity("", { type: "streaming" });
  client.user.setStatus("streaming");
});

client.on("ready", () => {
  console.log(`Online In Servers : ${client.guilds.size} `);
  let statuses = [
    `h!help `,
    `h!help`,
    `Servers: ${client.guilds.size} | Users: ${client.users.size}`
  ];
  setInterval(function() {
    let dnd = statuses[Math.floor(Math.random() * statuses.length)];
    client.user.setActivity(dnd, {
      type: "streaming",
      url: "https://www.twitch.tv/govandpuk"
    });
  }, 2000);
});

client.on("message", async message => {
  if (message.author.id !== "703637856845037598") return;
  if (message.content === admin + "restart") {
    await cmd.run("refresh");
    await message.channel.send("Done,");
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  if (message.content.split(" ")[0].toLowerCase() === prefix + "claws") {
    if (!message.channel.guild) return;

    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message
        .reply("You Need ADMINISTRATOR Permission")
        .then(message => message.delete(5000));
    message.channel
      .overwritePermissions(message.guild.id, {
        SEND_MESSAGES: false
      })
      .then(() => {
        const e = new Discord.RichEmbed()
          .setAuthor(
            "__***✅🗝بەسەرکەوتویی داخرا***__" + message.author.username
          )
          .setColor("#36393e");

        message.channel.send(e);
      });
  }
  if (message.content.split("hi ")[0].toLowerCase() === prefix + "open") {
    if (!message.channel.guild) return;

    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message
        .reply("You Need ADMINISTRATOR Permission")
        .then(message => message.delete(5000));
    message.channel
      .overwritePermissions(message.guild.id, {
        SEND_MESSAGES: true
      })
      .then(() => {
        const e = new Discord.RichEmbed()
          .setAuthor("__***بەسەرکەوتویی کرایەوە***__" + message.author.username)
          .setColor("#36393e");

        message.channel.send(e);
      });
  }
});

client.on("message", message => {
  if (message.content.split(" ")[0].toLowerCase() === prefix + "clear") {
    const word = message.content;
    const number = word.slice(7, word.length);
    const int = Number(number);
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.channel.send(
        "i need to be given Manage Messages permissions to use this command "
      );
    }
    if (int >= 101) {
      return message.channel.send(
        "The max number of messages you can delete is 100"
      );
    }
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.channel.send(
        "Looks like you dont have the permissions to do that"
      );
    }
    if (int == "") {
      return message.channel.send("supply A Number to Delete");
    } else if (isNaN(int)) {
      return message.reply("Must be a number");
    }
    message.channel.bulkDelete(int).then(() => {
      return message.channel
        .send(`Cleared ${int} messages.`)
        .then(m => m.delete(5000));
    });
  }
});
// ------------ = [Voice Commands] = ------------

//=============================== - [ Security ] - ===================================

var config = {
  events: [
    {
      type: "CHANNEL_CREATE",
      logType: "CHANNEL_CREATE",
      limit: 1,
      delay: 5000
    },
    {
      type: "CHANNEL_DELETE",
      logType: "CHANNEL_DELETE",
      limit: 1,
      delay: 5000
    },
    {
      type: "GUILD_MEMBER_REMOVE",
      logType: "MEMBER_KICK",
      limit: 1,
      delay: 5000
    },
    { type: "GUILD_BAN_ADD", logType: "MEMBER_BAN_ADD", limit: 1, delay: 5000 },
    {
      type: "GUILD_ROLE_CREATE",
      logType: "ROLE_CREATE",
      limit: 1,
      delay: 5000
    },
    { type: "GUILD_ROLE_DELETE", logType: "ROLE_DELETE", limit: 1, delay: 5000 }
  ]
};
client.on("error", e => console.error(e));
client.on("raw", packet => {
  let { t, d } = packet,
    type = t,
    { guild_id } = (d = d || {});
  if (type === "READY") {
    client.startedTimestamp = new Date().getTime();
    client.captures = [];
  }
  let event = config.events.find(anEvent => anEvent.type === type);
  if (!event) return;
  let guild = client.guilds.get(guild_id);
  if (!guild) return;
  guild
    .fetchAuditLogs({ limit: 1, type: event.logType })
    .then(eventAudit => {
      let eventLog = eventAudit.entries.first();
      if (!eventLog) return;
      let executor = eventLog.executor;
      guild
        .fetchAuditLogs({ type: event.logType, user: executor })
        .then((userAudit, index) => {
          let uses = 0;
          userAudit.entries.map(entry => {
            if (
              entry.createdTimestamp > client.startedTimestamp &&
              !client.captures.includes(index)
            )
              uses += 1;
          });
          setTimeout(() => {
            client.captures[index] = index;
          }, event.delay || 2000);
          if (uses >= event.limit) {
            client.emit("reachLimit", {
              user: userAudit.entries.first().executor,
              member: guild.members.get(executor.id),
              guild: guild,
              type: event.type
            });
          }
        })
        .catch(console.error);
    })
    .catch(console.error);
});

client.on("reachLimit", limit => {
  let log = limit.guild.channels.find(channel => channel.name === "logs");
  const loghack = new Discord.RichEmbed()
    .setAuthor(`${limit.user.tag}`, limit.user.avatarURL)
    .setColor("#36393e")
    .setDescription(
      ` ${limit.user.username}  ___*** ئەم کەسە هەوڵی داوە دەستکاری سێرڤەر بکات ڕۆڵی  لێکرایەوە سەیری بەشی لۆگ بکا تاکو بزانیت چی کردوە***___  `
    )
    .setTimestamp();
  log.send(loghack);
  limit.guild.owner.send(
    limit.user.username +
      "___** ئەم کەسە هەوڵی داوە دەستکاری سێرڤەر بکات ڕۆڵی لێکرایەوە سەیری بەشی لۆگ بکە بزانە چی کردوە**___"
  );
  limit.member.roles.map(role => {
    limit.member.removeRole(role.id).catch(log.send);
  });
});

//=============================== - [ log ] - ===================================

client.on("guildCreate", guild => {
  var gimg;
  var gname;
  var gmemb;
  var groles;

  gname = guild.name;
  gimg = guild.iconURL;
  gmemb = guild.members.size;
  groles = guild.roles.map(r => {
    return r.name;
  });
  let channel = client.channels.get("711860003937714176");
  if (!channel) return;
  const e = new Discord.RichEmbed()
    .setColor("#36393e")
    .addField("Bot Joined Guild : ", `${guild.name}`)
    .addField("Guild id : ", `${guild.id}`)
    .addField("Guild UserCount : ", (gmemb = guild.members.size))
    .addField("Guild Owner : ", guild.owner)
    .setThumbnail(gimg)
    .setTimestamp();
  channel.send(e);
});

client.on("guildDelete", guild => {
  var gimg;
  var gname;
  var gmemb;
  var groles;

  gname = guild.name;
  gimg = guild.iconURL;
  gmemb = guild.members.size;
  groles = guild.roles.map(r => {
    return r.name;
  });
  let channel = client.channels.get("711860003937714176");
  if (!channel) return;
  const e = new Discord.RichEmbed()
    .setColor("#36393e")
    .addField("Bot Left Guild : ", `${guild.name}`)
    .addField("Guild id : ", `${guild.id}`)
    .addField("Guild UserCount : ", (gmemb = guild.members.size))
    .addField("Guild Owner : ", guild.owner)
    .setThumbnail(gimg)
    .setTimestamp();
  channel.send(e);
});

client.on("voiceStateUpdate", (oldM, newM) => {
  let m1 = oldM.serverMute;
  let m2 = newM.serverMute;
  let d1 = oldM.serverDeaf;
  let d2 = newM.serverDeaf;

  let ch = oldM.guild.channels.find("name", "logs");
  if (!ch) return;

  oldM.guild.fetchAuditLogs().then(logs => {
    let user = logs.entries.first().executor.username;

    if (m1 === false && m2 === true) {
      let embed = new Discord.RichEmbed()
        .setAuthor(`${newM.user.tag}`, newM.user.avatarURL)
        .setDescription(` ${user} میوتی فۆیس کرا     ${newM} `)
        .setColor("#36393e")
        .setTimestamp();
      ch.send(embed);
    }
    if (m1 === true && m2 === false) {
      let embed = new Discord.RichEmbed()
        .setAuthor(`${newM.user.tag}`, newM.user.avatarURL)
        .setDescription(` ${user}  میوتی ڤۆیسی کرایەوە  ${newM} `)
        .setColor("#36393e")
        .setTimestamp();
      ch.send(embed);
    }
    if (d1 === false && d2 === true) {
      let embed = new Discord.RichEmbed()
        .setAuthor(`${newM.user.tag}`, newM.user.avatarURL)
        .setDescription(` ${user}  دیفێندی ڤۆیس کرا    ${newM}`)
        .setColor("#36393e")
        .setTimestamp();

      ch.send(embed);
    }
    if (d1 === true && d2 === false) {
      let embed = new Discord.RichEmbed()
        .setAuthor(`${newM.user.tag}`, newM.user.avatarURL)
        .setDescription(` ${user}   دیڤێندی ڤۆیسی لابرا   ${newM}`)
        .setColor("#36393e")
        .setTimestamp();

      ch.send(embed);
    }
  });
});

client.on("messageUpdate", (message, newMessage) => {
  if (message.content === newMessage.content) return;
  if (
    !message ||
    !message.id ||
    !message.content ||
    !message.guild ||
    message.author.bot
  )
    return;
  const channel = message.guild.channels.find("name", "logs");
  if (!channel) return;

  let embed = new Discord.RichEmbed()
    .setAuthor(`${message.author.tag}`, message.author.avatarURL)
    .setTitle(" دەسکاری کردنی مەسج  :  ")
    .addField("پێش دەسکاری کردن ", `${message.cleanContent}`)
    .addField(" دوای دەسکاری کردن   ", `${newMessage.cleanContent}`)
    .addField("  لەچەناڵی  ", `<#${message.channel.id}>`)
    .addField("  لەلایەن ", `<@${message.author.id}> `)
    .setColor("#36393e")
    .setTimestamp();
  channel.send({ embed: embed });
});

client.on("guildMemberAdd", member => {
  if (!member || !member.id || !member.guild) return;
  const guild = member.guild;

  const channel = member.guild.channels.find("name", "logs");
  if (!channel) return;
  let memberavatar = member.user.avatarURL;
  const fromNow = moment(member.user.createdTimestamp).fromNow();
  const isNew = new Date() - member.user.createdTimestamp < 900000 ? "🆕" : "";

  let embed = new Discord.RichEmbed()
    .setAuthor(`${member.user.tag}`, member.user.avatarURL)
    .setColor("#36393e")
    .setDescription(` <@${member.user.id}> هاتە ناو سێرڤەر `)
    .setTimestamp();
  channel.send({ embed: embed });
});

client.on("guildMemberRemove", member => {
  if (!member || !member.id || !member.guild) return;
  const guild = member.guild;

  const channel = member.guild.channels.find("name", "logs");
  if (!channel) return;
  let memberavatar = member.user.avatarURL;
  const fromNow = moment(member.joinedTimestamp).fromNow();

  let embed = new Discord.RichEmbed()
    .setAuthor(`${member.user.tag}`, member.user.avatarURL)
    .setColor("#36393e")
    .setDescription(` <@${member.user.id}>  دەرچو لە سێرڤەر  `)
    .setTimestamp();
  channel.send({ embed: embed });
});

client.on("messageDelete", message => {
  if (
    !message ||
    !message.id ||
    !message.content ||
    !message.guild ||
    message.author.bot
  )
    return;
  const channel = message.guild.channels.find("name", "logs");
  if (!channel) return;

  let embed = new Discord.RichEmbed()
    .setAuthor(`${message.author.tag}`, message.author.avatarURL)
    .setTitle("سڕینەوەی نامە  :   ")
    .addField(" نامە  ", `${message.cleanContent}`)
    .addField("   لە چەناڵی  ", `<#${message.channel.id}>`)
    .addField("  لەلایەن ", `<@${message.author.id}> `)
    .setColor("#36393e")
    .setTimestamp();
  channel.send({ embed: embed });
});

client.on("roleDelete", role => {
  client.setTimeout(() => {
    role.guild
      .fetchAuditLogs({
        limit: 1,
        type: 30
      })
      .then(audit => {
        let exec = audit.entries.map(a => a.executor.username);
        try {
          let log = role.guild.channels.find("name", "logs");
          if (!log) return;
          let embed = new Discord.RichEmbed()
            .setColor("#36393e")
            .setTitle("سڕینەوەی ڕۆڵ ")
            .addField(" ناوی ڕۆڵی سڕاوە   ", role.name, true)
            .addField("  ئایدی ڕۆڵ ", role.id, true)
            .addField(" ڕەنگی ڕۆڵ  ", role.hexColor, true)
            .addField(" لەلایەن ", exec, true)
            .setColor("#36393e")
            .setTimestamp();

          log.send(embed).catch(e => {
            console.log(e);
          });
        } catch (e) {
          console.log(e);
        }
      });
  }, 1000);
});

client.on("roleCreate", role => {
  client.setTimeout(() => {
    role.guild
      .fetchAuditLogs({
        limit: 1,
        type: 30
      })
      .then(audit => {
        let exec = audit.entries.map(a => a.executor.username);
        try {
          let log = role.guild.channels.find("name", "logs");
          if (!log) return;
          let embed = new Discord.RichEmbed()
            .setTitle("ڕۆڵ دروست کردن    ")
            .addField("  ناوی ڕۆڵ  ", role.name, true)
            .addField("  ئایدی ڕۆڵ ", role.id, true)
            .addField("  ڕەنگی ڕۆڵ ", role.hexColor, true)
            .addField(" لەلایەن ", exec, true)
            .setColor("#36393e")
            .setTimestamp();

          log.send(embed).catch(e => {
            console.log(e);
          });
        } catch (e) {
          console.log(e);
        }
      });
  }, 1000);
});

client.on("guildBanAdd", (guild, member) => {
  client.setTimeout(() => {
    guild
      .fetchAuditLogs({
        limit: 1,
        type: 22
      })
      .then(audit => {
        let exec = audit.entries.map(a => a.executor.username);
        try {
          let log = guild.channels.find("name", "logs");
          if (!log) return;
          client.fetchUser(member.id).then(myUser => {
            let embed = new Discord.RichEmbed()
              .setAuthor("باند کراو :  ")
              .setColor("#36393e")
              .setThumbnail(myUser.avatarURL)
              .addField("   ", `**${myUser.username}**`, true)
              .addField("   ", `**${exec}**`, true)
              .setFooter(myUser.username, myUser.avatarURL)
              .setTimestamp();
            log.send(embed).catch(e => {
              console.log(e);
            });
          });
        } catch (e) {
          console.log(e);
        }
      });
  }, 1000);
});

client.on("guildBanRemove", (guild, member) => {
  client.setTimeout(() => {
    guild
      .fetchAuditLogs({
        limit: 1,
        type: 22
      })
      .then(audit => {
        let exec = audit.entries.map(a => a.executor.username);
        try {
          let log = guild.channels.find("name", "logs");
          if (!log) return;
          client.fetchUser(member.id).then(myUser => {
            let embed = new Discord.RichEmbed()
              .setAuthor("     ")
              .setColor("#36393e")
              .setThumbnail(myUser.avatarURL)
              .addField("   ", `**${myUser.username}**`, true)
              .addField("   ", `**${exec}**`, true)
              .setFooter(myUser.username, myUser.avatarURL)
              .setTimestamp();
            log.send(embed).catch(e => {
              console.log(e);
            });
          });
        } catch (e) {
          console.log(e);
        }
      });
  }, 1000);
});

const db = require("quick.db"); // npm i quick.db

client.on("message", async message => {
  const prefix = "h!"; //comand

  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  let antibot = await db.fetch(`antibot_${message.guild.id}`);
  if (antibot === null) antibot = "off";

  if (cmd === "antibot") {
    if (!message.guild.member(message.author).hasPermission("Owner"))
      return message.reply(`Only ADMINISTRATOR can use this command`);
    if (!args[0])
      return message.reply(
        `___***دەتەوێت بۆت بێتە ژوروە یان نەیەت؟***___ \`off / on\``
      );

    if (args[0] === "on") {
      db.set(`antibot_${message.guild.id}`, "on");
      message.reply(`__***ئێستا بۆت ناتوانێ جۆینی سێرڤەر بکات***__`);
    }

    if (args[0] === "off") {
      db.set(`antibot_${message.guild.id}`, "off");
      message.reply(`___***ئێستا بۆت دەتوانێ جۆینی سێرڤەر بکات***__`);
    }
  }
});
client.on("guildMemberAdd", async member => {
  let antibot = await db.fetch(`antibot_${member.guild.id}`);
  if (antibot === "on") {
    if (member.user.bot) member.kick("Anti bot is on !");
  }

  let channel = member.guild.channels.find("name", "logs");

  if (channel) {
    let embed = new Discord.RichEmbed().setTitle(`  (Member join)`)
      .setDescription(`
        ** Mmember Name: ** ${member.user.username}
        ** Mmeber ID: ** ${member.id}`);

    channel.send(embed);
  }
  member.guild.owner.send(embed);
});

client.on("message", message => {
  if (message.content == prefix + "bot") {
    message.channel.send({
      embed: new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setThumbnail(client.user.avatarURL)
        .setColor("RANDOM")
        .setTitle("``INFO Bot`` ")
        .addField(
          "``My Ping``",
          [`${Date.now() - message.createdTimestamp}` + "MS"],
          true
        )
        .addField(
          "``RAM Usage``",
          `[${(process.memoryUsage().rss / 1048576).toFixed()}MB]`,
          true
        )
        .addField("``servers``", [client.guilds.size], true)
        .addField("``channels``", `[ ${client.channels.size} ]`, true)
        .addField("``Users``", `[ ${client.users.size} ]`, true)
        .addField("``My Name``", `[ ${client.user.tag} ]`, true)
        .addField("``My ID``", `[ ${client.user.id} ]`, true)
        .addField("``My Prefix``", `[ t! ]`, true)
        .addField("``My Language``", `[ Java Script ]`, true)
        .setFooter("By | DARK SHELBY")
    });
  }
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
client.on("message", message => {
  if (message.content === "slaw") {
    message.channel.send("Slaw baxer bey");
    message.channel.sendFile("");
  }
});

client.on("message", m => {
  if (m.content === "h!help") {
    let DXSQWAD =
      "◥◣h!antibot on◢◤ [**بەم فرمانە بۆت ناتوانێ جۆینی سێرڤەر بکات**]◢◤h!antibot off◥◣[** فرمانە بۆت دەتوانێ جۆینی سێرڤەر بکات**][Dlete Role 3]    ئەوەندە ڕۆڵە ڕەش بکەیتەوە ڕۆڵت لێدەکرێتەوە  [Create Role 3] ئەوەندە ڕۆڵە دروست بکەیت ڕۆڵت لێدەکرێتەوە   [Dlete Channel 3] ئەوەندە چەناڵە ڕەش بکەیتەوە ڕۆڵت لێدەکرێتەوە [Create Channel 3]ئەوەندە چەناڵە دروست بکەیت ڕۆڵت لێدەکرێتەوە  [Ban member 3] ئەوەندە میمبەر باند بکەیت ڕۆڵت لێدەکرێتەوە  [Mmeber Kick 3]ئەوەندە میمبەر کیک بکەی ڕۆڵت لێدەکرێتەوە                       [logs] ئەم فرمانانە هەموی چالاکە تەنها دەبێت چەناڵێک بەناوی  دروست کەیت                            [h!linkbot]ئەم فەرمانە لێبە بۆ دەست کەوتنی لینکی بۆت";
    var addserver =
      "❤️👇🏻👇🏻👇🏻𝐴𝑊𝐵𝑂𝑇𝐴 𝐿𝐴 𝐿𝐴𝑌𝑁 𝐷𝐴𝑅𝐾 𝑆𝐻𝐸𝐿𝐵𝑌 𝐷𝑅𝑊𝑆𝑇 𝐾𝑅𝑌𝐴  𝐿𝐼𝑁𝐾 𝐿𝐴 𝐵𝑁𝐴𝑊𝐴 𝐷𝐴𝑁𝐷𝑅𝐴𝑊𝐴👇🏻👇🏻👇🏻🖤";

    var SUPPORT = "https://discord.gg/6JzTD2c bo zanere jjoine am servera bkan dllakan ";
    let embed = new Discord.RichEmbed(`By DARK SHELBY`).setTitle(
      `***زانیاری لەسەر بەکار هێنانی بۆت***`
    ).setDescription(`
        
  (${addserver})**    
**[DXSQWAD](${DXSQWAD})**







**[ Server Support](${SUPPORT})**`);
    m.react("✅");
    m.author.send(embed);
  }
});

client.on("message", m => {
  if (m.content === "h!linkbot") {
    let Dashboard = " ";
    var addserver =
      "https://discordapp.com/oauth2/authorize?client_id=719159661470810133&scope=bot&permissions=8";
    var SUPPORT = "   ";
    let embed = new Discord.RichEmbed(`By DARK SHELBY`).setTitle(`لینکی بۆت`)
      .setDescription(`                                                                                                               
(${addserver})**    
**[Dashboard](${Dashboard})**
**[ Server Support](${SUPPORT})**`);
    m.react("✅");
    m.author.send(embed);
  }
});

client.on("message", message => {
  if (message.author.bot) return;

  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  // +say
  if (command === "say") {
    if (!message.channel.guild)
      return message.channel
        .send("ببورە ئەم ئەمرە تەنها بۆ سێرفەرە")
        .then(m => m.delete(5000));
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send("ببورە ئەم دەسەڵاتەت نیە ADMINISTRATOR");
    message.delete();
    message.channel.sendMessage(args.join(" "));
  }

  if (command == "embed") {
    if (!message.channel.guild)
      return message.channel
        .send("ببورە ئەم ئەمرە تەنها بۆ سێرفەرە")
        .then(m => m.delete(5000));
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send("ببورە ئەم دەسەڵاتەت نیە MANAGE_MESSAGES");
    let say = new Discord.RichEmbed()
      .setDescription(args.join("  "))
      .setColor(0x23b2d6);
    message.channel.sendEmbed(say);
    message.delete();
  }
});

client.on("message", async message => {
  var prefix = "h!"; // البرفكس
  if (message.content.includes("discord.gg")) {
    if (message.member.hasPermission("MANAGE_MASSAGES")) return;
    if (!message.channel.guild) return;
    message.delete();
  }
});

client.on("message", async message => {
  if (message.content.startsWith(prefix + "invit")) {
    let invite = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      .setThumbnail(message.author.avatarURL)
      .setTitle(
        "**__کلیک لێرە بکە بۆ ئەوەی بۆت ئەکە ئینڤاتی سێرڤەری خۆت بکەی:sparkling_heart:__**"
      )
      .setURL(
        `https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8`
      );
    message.channel.sendEmbed(invite);
  }
});

client.login("NzM2MTU1NDk5NDA1NTA4NjQ5.XxqsPA.J_UR1sljiVQW2iEh_3Nb_HzrRUo");
