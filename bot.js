
//=============================== - [ Consts ] - ===================================



const Discord = require("discord.js");
const client = new Discord.Client();
const cmd = require("node-cmd");
const http =require('http');
const express = require('express');
const app = express();
const ms = require("ms");
const fs = require('fs');
const moment = require('moment');
const request = require('request');
const dateFormat = require('dateformat');
const r1 = require('snekfetch');
const jimp = require('jimp');
const child_process = require("child_process");
app.get("/", (request , response) => {
	 response.sendStatus(200);
});
app.listen(process.env.PROT);
setInterval(() => {
	http.get(`http://security-chanel.glitch.me/`);
}, 280000);
let developers = ["641969954920333323"];
const admin = "t!";
const prefix = "t!";


//=============================== - [ Bot ] - ===================================


client.on('ready', () => {
  console.log(`Logged in as : ${client.user.tag}!`);
  console.log(`Servers : [ " ${client.guilds.size} " ]`);
  console.log(`Users : [ " ${client.users.size} " ]`);
  console.log(`Channels : [ " ${client.channels.size} " ]`);
   client.user.setActivity("t!help | Security Strong",{type: 'playing'})
   client.user.setStatus("idle")
});

client.on("message", async message => {
  if(message.author.id !== "703637856845037598") return;
  if(message.content === admin + "restart") {
    await cmd.run("refresh")
    await message.channel.send("Done,")
  }
})




  


client.on('message', message => {

if (message.author.bot) return;
  if (message.content.split(" ")[0].toLowerCase() === prefix + "daixa") {
                        if(!message.channel.guild) return;

if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You Need ADMINISTRATOR Permission').then(message => message.delete(5000))
           message.channel.overwritePermissions(message.guild.id, {
         SEND_MESSAGES: false

           }).then(() => {
 const e = new Discord.RichEmbed()
               .setAuthor('__***✅🗝بەسەرکەوتویی داخرا***__'+message.author.username)
                .setColor('#36393e')
               
               message.channel.send(e)
               });
             }
if (message.content.split(" ")[0].toLowerCase() === prefix + "bikarawa") {
    if(!message.channel.guild) return;

if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You Need ADMINISTRATOR Permission').then(message => message.delete(5000))
           message.channel.overwritePermissions(message.guild.id, {
         SEND_MESSAGES: true

           }).then(() => {
               const e = new Discord.RichEmbed()
               .setAuthor('__***بەسەرکەوتویی کرایەوە***__'+message.author.username)
                        .setColor('#36393e')
               
               message.channel.send(e)
           });
             }



});






client.on('message', message => {
 if (message.content.split(" ")[0].toLowerCase() === prefix + "clear") {
        const word = message.content;
        const number = word.slice(7, word.length);
        const int = Number(number);
         if(!message.member.hasPermission("MANAGE_MESSAGES")){
            return message.channel.send("i need to be given Manage Messages permissions to use this command ");
}
         if(int >= 101){
            return message.channel.send("The max number of messages you can delete is 100");
}
         if(!message.member.hasPermission("MANAGE_MESSAGES")){
            return message.channel.send("Looks like you dont have the permissions to do that");
}
         if(int == ""){
            return message.channel.send("supply A Number to Delete");
        }else if (isNaN(int)){
            return message.reply('Must be a number')
        }
        message.channel.bulkDelete(int).then(() => {
            return message.channel.send(`Cleared ${int} messages.`).then(m => m.delete(5000))
    });
    }
})
// ------------ = [Voice Commands] = ------------

 

//=============================== - [ Security ] - ===================================

var config = {
  events: [
    {type: "CHANNEL_CREATE", logType: "CHANNEL_CREATE", limit: 3 , delay: 5000},
    {type: "CHANNEL_DELETE", logType: "CHANNEL_DELETE", limit: 3, delay: 5000},
    {type: "GUILD_MEMBER_REMOVE", logType: "MEMBER_KICK", limit: 3, delay: 5000},
    {type: "GUILD_BAN_ADD", logType: "MEMBER_BAN_ADD", limit: 3, delay: 5000},
    {type: "GUILD_ROLE_CREATE", logType: "ROLE_CREATE", limit: 3, delay: 5000},
    {type: "GUILD_ROLE_DELETE", logType: "ROLE_DELETE", limit: 3, delay: 5000},
  ]
}
client.on("error", (e) => console.error(e));
client.on("raw", (packet)=> {
  let {t, d} = packet, type = t, {guild_id} = data = d || {};
  if (type === "READY") {
    client.startedTimestamp = new Date().getTime();
    client.captures = [];
  }
  let event = config.events.find(anEvent => anEvent.type === type);
  if (!event) return;
  let guild = client.guilds.get(guild_id);
  if (!guild) return;
  guild.fetchAuditLogs({limit : 1, type: event.logType})
    .then(eventAudit => {
      let eventLog = eventAudit.entries.first();
      if (!eventLog) return;
      let executor = eventLog.executor;
      guild.fetchAuditLogs({type: event.logType, user: executor})
        .then((userAudit, index) => {
          let uses = 0;
          userAudit.entries.map(entry => {
            if (entry.createdTimestamp > client.startedTimestamp && !client.captures.includes(index)) uses += 1;
          });
          setTimeout(() => {
            client.captures[index] = index
          }, event.delay || 2000)
          if (uses >= event.limit) {
            client.emit("reachLimit", {
              user: userAudit.entries.first().executor,
              member: guild.members.get(executor.id),
              guild: guild,
              type: event.type,
            })
          }
        }).catch(console.error)
    }).catch(console.error)
});

client.on("reachLimit", (limit)=> {
	
  let log = limit.guild.channels.find( channel => channel.name === "log");
  const loghack = new Discord.RichEmbed()
       .setAuthor(`${limit.user.tag}`, limit.user.avatarURL)
       .setColor('#36393e')
       .setDescription(` ${limit.user.username}  ___*** ئەم کەسە هەوڵی داوە دەستکاری سێرڤەر بکات ڕۆڵی  لێکرایەوە***___  `)
       .setTimestamp();
  log.send(loghack);
  log.send("@everyone");
  limit.guild.owner.send(limit.user.username+"___** ئەم کەسە هەوڵی داوە دەستکاری سێرڤەر بکات ڕۆڵی لێکرایەوە**___")
  limit.member.roles.map(role => {
    limit.member.removeRole(role.id)
    .catch(log.send)
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
groles = guild.roles.map(r=> {return r.name});
  let channel = client.channels.get('709782102396239903')
    if(!channel) return;
const e = new Discord.RichEmbed()
.setColor('#36393e')
.addField('Bot Joined Guild : ', `${guild.name}`)
.addField('Guild id : ', `${guild.id}`)
.addField('Guild UserCount : ',gmemb = guild.members.size)
.addField('Guild Owner : ', guild.owner)
.setThumbnail(gimg)
.setTimestamp()
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
groles = guild.roles.map(r=> {return r.name});
  let channel = client.channels.get('709782102396239903')
  if(!channel) return;
const e = new Discord.RichEmbed()
.setColor('#36393e')
.addField('Bot Left Guild : ', `${guild.name}`)
.addField('Guild id : ', `${guild.id}`)
.addField('Guild UserCount : ',gmemb = guild.members.size)
.addField('Guild Owner : ', guild.owner)
.setThumbnail(gimg)
.setTimestamp()
 channel.send(e);

});
 

client.on('voiceStateUpdate', (oldM, newM) => {
  let m1 = oldM.serverMute;
  let m2 = newM.serverMute;
  let d1 = oldM.serverDeaf;
  let d2 = newM.serverDeaf;

  let ch = oldM.guild.channels.find('name', 'log')
  if(!ch) return;

    oldM.guild.fetchAuditLogs()
    .then(logs => {

      let user = logs.entries.first().executor.username

    if(m1 === false && m2 === true) {
       let embed = new Discord.RichEmbed()
       .setAuthor(`${newM.user.tag}`, newM.user.avatarURL)
       .setDescription(` ${user} میوتی فۆیس کرا     ${newM} `)
       .setColor('#36393e')
        .setTimestamp()
       ch.send(embed)
    }
    if(m1 === true && m2 === false) {
       let embed = new Discord.RichEmbed()
       .setAuthor(`${newM.user.tag}`, newM.user.avatarURL)
       .setDescription(` ${user}  میوتی ڤۆیسی کرایەوە  ${newM} `)
       .setColor('#36393e')
       .setTimestamp()
       ch.send(embed)
    }
    if(d1 === false && d2 === true) {
       let embed = new Discord.RichEmbed()
       .setAuthor(`${newM.user.tag}`, newM.user.avatarURL)
       .setDescription(` ${user}  دیفێندی ڤۆیس کرا    ${newM}`)
       .setColor('#36393e')
       .setTimestamp()

       ch.send(embed)
    }
    if(d1 === true && d2 === false) {
       let embed = new Discord.RichEmbed()
       .setAuthor(`${newM.user.tag}`, newM.user.avatarURL)
       .setDescription(` ${user}   دیڤێندی ڤۆیسی لابرا   ${newM}`)
       .setColor('#36393e')
       .setTimestamp()

       ch.send(embed)
    }
  })
})


  client.on('messageUpdate', (message, newMessage) => {
    if (message.content === newMessage.content) return;
    if (!message || !message.id || !message.content || !message.guild || message.author.bot) return;
    const channel = message.guild.channels.find('name', 'log');
    if (!channel) return;
 
    let embed = new Discord.RichEmbed()
       .setAuthor(`${message.author.tag}`, message.author.avatarURL)
.setTitle(' دەسکاری کردنی مەسج  :  ')
.addField('پێش دەسکاری کردن ',`${message.cleanContent}`)
.addField(' دوای دەسکاری کردن   ',`${newMessage.cleanContent}`)
.addField('    ',`<#${message.channel.id}>`)
.addField('   ', `<@${message.author.id}> `)
.setColor('#36393e')
       .setTimestamp();
     channel.send({embed:embed});
 
 
});
 
client.on('guildMemberAdd', member => {
    if (!member || !member.id || !member.guild) return;
    const guild = member.guild;
   
    const channel = member.guild.channels.find('name', 'log');
    if (!channel) return;
    let memberavatar = member.user.avatarURL
    const fromNow = moment(member.user.createdTimestamp).fromNow();
    const isNew = (new Date() - member.user.createdTimestamp) < 900000 ? '🆕' : '';
   
    let embed = new Discord.RichEmbed()
       .setAuthor(`${member.user.tag}`, member.user.avatarURL)
       .setColor('#36393e')
       .setDescription(` <@${member.user.id}> هاتە ناو سێرڤەر `)
       .setTimestamp();
     channel.send({embed:embed});
});
 
client.on('guildMemberRemove', member => {
    if (!member || !member.id || !member.guild) return;
    const guild = member.guild;
   
    const channel = member.guild.channels.find('name', 'log');
    if (!channel) return;
    let memberavatar = member.user.avatarURL
    const fromNow = moment(member.joinedTimestamp).fromNow();
   
    let embed = new Discord.RichEmbed()
       .setAuthor(`${member.user.tag}`, member.user.avatarURL)
       .setColor('#36393e')
       .setDescription(` <@${member.user.id}>  دەرچو لە سێرڤەر  `)
       .setTimestamp();
     channel.send({embed:embed});
});
 
client.on('messageDelete', message => {
    if (!message || !message.id || !message.content || !message.guild || message.author.bot) return;
    const channel = message.guild.channels.find('name', 'log');
    if (!channel) return;
   
    let embed = new Discord.RichEmbed()
       .setAuthor(`${message.author.tag}`, message.author.avatarURL)
 .setTitle('سڕینەوەی نامە  :   ')
 .addField('   لە لایەن ',`${message.cleanContent}`)
 .addField('   لە چەناڵی  ',`<#${message.channel.id}>`)
 .addField('   ', `<@${message.author.id}> `)
       .setColor('#36393e')
       .setTimestamp();
     channel.send({embed:embed});
 
});

     
      client.on("roleDelete", role => {
  client.setTimeout(() => {
    role.guild.fetchAuditLogs({
        limit: 1,
        type: 30
      })
      .then(audit => {
        let exec = audit.entries.map(a => a.executor.username)
        try {

          let log = role.guild.channels.find('name', 'log');
          if (!log) return;
          let embed = new Discord.RichEmbed()
            .setColor('#36393e')          
            .setTitle('سڕینەوەی ڕۆڵ ')
            .addField(' ناوی ڕۆڵی سڕاوە   ', role.name, true)
            .addField('  ئایدی ڕۆڵ ', role.id, true)
            .addField(' ڕەنگی ڕۆڵ  ', role.hexColor, true)
            .addField('  ', exec, true)
            .setColor('#36393e') 
            .setTimestamp()
            
          log.send(embed).catch(e => {
            console.log(e);
          });
        } catch (e) {
          console.log(e);
        }
      })
  }, 1000)
})


client.on('roleCreate', role => {
  client.setTimeout(() => {
    role.guild.fetchAuditLogs({
        limit: 1,
        type: 30
      })
      .then(audit => {
        let exec = audit.entries.map(a => a.executor.username)
        try {

          let log = role.guild.channels.find('name', 'log');
          if (!log) return;
          let embed = new Discord.RichEmbed()
            .setTitle('+ڕۆڵ دروست کردن    ')
            .addField('  ناوی ڕۆڵ  ', role.name, true)
            .addField('  ئایدی ڕۆڵ ', role.id, true)
            .addField('  ڕەنگی ڕۆڵ ', role.hexColor, true)
            .addField('  ', exec, true)
            .setColor('#36393e') 
            .setTimestamp()
            
          log.send(embed).catch(e => {
            console.log(e);
          });
        } catch (e) {
          console.log(e);
        }
      })
  }, 1000)
})




  client.on("guildBanAdd", (guild, member) => {
  client.setTimeout(() => {
    guild.fetchAuditLogs({
        limit: 3,
        type: 22
      })
      .then(audit => {
        let exec = audit.entries.map(a => a.executor.username);
        try {
          let log = guild.channels.find('name', 'log');
          if (!log) return;
          client.fetchUser(member.id).then(myUser => {
          let embed = new Discord.RichEmbed()
        .setAuthor("باند کراو :  ")
        .setColor('#36393e') 
        .setThumbnail(myUser.avatarURL)
        .addField('   ',`**${myUser.username}**`,true)
        .addField('   ',`**${exec}**`,true)
        .setFooter(myUser.username,myUser.avatarURL)
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
    guild.fetchAuditLogs({
        limit: 3,
        type: 22
      })
      .then(audit => {
        let exec = audit.entries.map(a => a.executor.username);
        try {
          let log = guild.channels.find('name', 'log');
          if (!log) return;
          client.fetchUser(member.id).then(myUser => {
          let embed = new Discord.RichEmbed()
        .setAuthor("     ")
        .setColor('#36393e') 
		 .setThumbnail(myUser.avatarURL)
        .addField('   ',`**${myUser.username}**`,true)
        .addField('   ',`**${exec}**`,true)
        .setFooter(myUser.username,myUser.avatarURL)
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




const db = require("quick.db") // npm i quick.db
 
 
client.on("message", async message => {
   
 
 
    const prefix = "t!" //comand
 
 
 
   
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
 
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
 
let antibot = await db.fetch(`antibot_${message.guild.id}`);
    if(antibot === null) antibot = "off";  
   
    if(cmd === "antibot") {
    if (!message.guild.member(message.author).hasPermission("ADMINISTRATOR"))
        return message.reply(`Only ADMINISTRATOR can use this command`)
        if(!args[0]) return message.reply(`___***دەتەوێت بۆت بێتە ژوروە یان نەیەت؟***___ \`off / on\``)
 
 
        if(args[0] === "on") {
            db.set(`antibot_${message.guild.id}`, "on")
            message.reply(`__***ئێستا بۆت ناتوانێ جۆینی سێرڤەر بکات***__`)
        }
 
        if(args[0] === "off") {
            db.set(`antibot_${message.guild.id}`, "off")
            message.reply(`___***ئێستا بۆت دەتوانێ جۆینی سێرڤەر بکات***__`)
 
        }
    }
   
});
client.on("guildMemberAdd", async member => {
    let antibot = await db.fetch(`antibot_${member.guild.id}`);
    if(antibot === "on") {
        if(member.user.bot) member.kick("Anti bot is on !")
    }

    let channel = member.guild.channels.find("name", "log");  

    if(channel) {
        let embed = new Discord.RichEmbed()
        .setTitle(` هەوڵ درا بۆت بێنرێتە ژورەوە کیک کرا   (kicked !)`)
        .setDescription(`
        **- Bot name: ** ${member.user.username}
        **- Bot ID: ** ${member.id}`)
        
        
        channel.send(embed)
    }
    member.guild.owner.send(embed)

})




client.login("NzAzNjM3ODU2ODQ1MDM3NTk4.XrrDdA.GtvKU3EswHRKz1DLc41EoTnlUgo");



  client.on('message', function(msg){
        const prefix = 't!'
    if(msg.content == prefix + 'server')
    { let embed = new Discord.RichEmbed() 
    .setColor('RANDOM') 
    .setThumbnail(msg.guild.iconURL) 
    .setTitle(`Showing Details Of **${msg.guild.name}**`) 
    .addField('🌐** جـۆری سـێـرڤـەر**',`[** __${msg.guild.region}__ **]`,true) 
    .addField('🏅** __ڕێکخستن__**',`[** __${msg.guild.roles.size}__ **]`,true) 
    .addField('🔴**__ هەمو مێمبەرەکان__**',`[** __${msg.guild.memberCount}__ **]`,true) 
    .addField('🔵**__ ئەو کەسانەی ئۆنڵاین__**',`[** __${msg.guild.members.filter(m => m.presence.status == 'online').size}__ **]`,true) 
    .addField('📝**__ رومی چاتی__**',`[** __${msg.guild.channels.filter(m => m.type === 'text').size}__** ]`,true) 
    .addField('🎤**__ رۆمی دەنگی __**',`[** __${msg.guild.channels.filter(m => m.type === 'voice').size}__ **]`,true) 
    .addField('👑**__ ئـۆنـەر __**',`**${msg.guild.owner}**`,true) 
    .addField('🆔**__ ئایدی سێرڤەر__**',`**${msg.guild.id}**`,true) 
    .addField('📅**__ کاتی دانانی سێرڤەر __**',msg.guild.createdAt.toLocaleString())
    msg.channel.send({embed:embed}); 
    }
  });



 client.on('message', message => {
    if (message.content == prefix + "bot") {
    message.channel.send({
        embed: new Discord.RichEmbed()
            .setAuthor(client.user.username,client.user.avatarURL)
            .setThumbnail(client.user.avatarURL)
            .setColor('RANDOM')
            .setTitle('``INFO Bot`` ')
            .addField('``My Ping``' , [`${Date.now() - message.createdTimestamp}` + 'MS'], true)
            .addField('``RAM Usage``', `[${(process.memoryUsage().rss / 1048576).toFixed()}MB]`, true)
            .addField('``servers``', [client.guilds.size], true)
            .addField('``channels``' , `[ ${client.channels.size} ]` , true)
            .addField('``Users``' ,`[ ${client.users.size} ]` , true)
            .addField('``My Name``' , `[ ${client.user.tag} ]` , true)
            .addField('``My ID``' , `[ ${client.user.id} ]` , true)
			      .addField('``My Prefix``' , `[ t! ]` , true)
			      .addField('``My Language``' , `[ Java Script ]` , true)
			      .setFooter('By |『BSS』ToOFaN ')
    })
    }
  });
