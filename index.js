var mineflayer = require('mineflayer')
var D = require('discord.js')
var client = new D.Client();
var config = require('./config.json')
var chalk = require('chalk')

let prefix = process.env.PREFIX || config.prefix
let color = "#RANDOM";


// =========================
// SET ACTIVITY BOT
// =========================
client.on('ready', activity => {
  client.user.setStatus(`online`)
  client.user.setActivity(
    `For Help Do ${prefix}help `, {
      type: "WATCHING"
    }
  )
});

client.on('ready', async () => {
  console.log(chalk.blue('=-()-=-=()=--=()=--=()=--=()=--=()=-()-=-=()=--=()=--=()=--=()=--=()'))
  console.log(chalk.magenta(`Discord Bot on. Loggined as ${client.user.tag}`))
  console.log(chalk.red('=-()-=-=()=--=()=--=()=--=()=--=()=-()-=-=()=--=()=--=()=--=()=--=()'))
  console.log();
})

let bot
let isbotexist = false
function turnonbot(ip, version, username, pass,client,msg) {
if (isbotexist == true) return msg.channel.send(`There is already a bot running...\nUse ${prefix}leave first to get the bot off`)
  if(pass){
    bot = mineflayer.createBot({
      host: ip,
      username: username,
      password: pass,
      version: version
    })  
  }else if (!pass || pass == "crack"){
    bot = mineflayer.createBot({
      host: ip,
      username: username,
      version: version
    })  
  }
  bot.on('login', async () => {
    console.log(chalk.blue('=-()-=-=()=--=()=--=()=--=()=--=()=-()-=-=()=--=()=--=()=--=()=--=()'))
    console.log(chalk.magenta(`${bot.username} is on At ${ip}`))
    console.log(chalk.red('=-()-=-=()=--=()=--=()=--=()=--=()=-()-=-=()=--=()=--=()=--=()=--=()'))
    console.log();

    msg.channel.send(`${bot.username} Has Logged into ${ip}`)
  })

  bot.on("message", message => {
    let channel = client.channels.cache.get(config.scid)
    
    if (!channel) return;
    channel.send(`From Server Chat >> ${message}`)
  })
  isbotexist = true
}
function leave(msg){
  isbotexist = false
  bot.end()
  bot.on("end", function(){
    msg.channel.send("The Bot Has Sucsessfully ended")
  })
}
client.on('message', msg => {
  if (!msg.content.startsWith(prefix)) return
  args = msg.content.slice(prefix.length).split(/ +/);
command = args.shift().toLowerCase();

  if(command == "join") {
    turnonbot(args[0], args[1], args[2], args[3],client,msg)
  }else if (command == "leave"){
    leave(msg)
  }else if (command === "test"){
    msg.channel.send("test")
  }

  if(isbotexist == true){
    if (command == "sudo") {
      const chat = args.join(" ")
      bot.chat(chat)
      const success = new D.MessageEmbed()
        .setDescription(`:white_check_mark: ${msg.author.tag} sent \`${chat}\``)
        .setColor(color)
      msg.channel.send(success)
    } else if (command == "forward") {
      bot.setControlState('forward', true)
      const MoForw = new D.MessageEmbed()
        .setDescription(`:white_check_mark: Im Moving forward To Stop Do -stop`)
        .setColor(color)
      msg.channel.send(MoForw)
    } else if (command == "backward") {
      bot.setControlState('back', true)
      const MoBackw = new D.MessageEmbed()
        .setDescription(`:white_check_mark: Im Moving backward To Stop Do -stop`)
        .setColor(color)
      msg.channel.send(MoBackw)
    } else if (command == "stop") {
      bot.clearControlStates()
      const MoStop = new D.MessageEmbed()
        .setDescription(`:white_check_mark: Stopped!`)
        .setColor(color)
      msg.channel.send(MoStop)
    } else if (command == "left") {
      bot.setControlState('left', true)
      const MoLeft = new D.MessageEmbed()
        .setDescription(`:white_check_mark: Im Moving left To Stop Do -stop`)
        .setColor(color)
      msg.channel.send(MoLeft)
    } else if (command == "right") {
      bot.setControlState('right', true)
      const MoRight = new D.MessageEmbed()
        .setDescription(`:white_check_mark: Im Moving Right To Stop Do -stop`)
        .setColor(color)
      msg.channel.send(MoRight)
    } else if (command == "help") {
      const help = new D.MessageEmbed()
        .setTitle(`Help`)
        .addField(` ${prefix}sudo (Chat) `, 'To Get The bot say what you want')
        .addField(` ${prefix}movement `, 'Look At Movement command')
        .setColor(color)
      msg.channel.send(help)
    } else if (command == "movement") {
      const movement = new D.MessageEmbed()
        .setTitle(`Movement Command`)
        .addField(` ${prefix}forward `, 'To Move Forward')
        .addField(` ${prefix}backward `, 'To Move Backward')
        .addField(` ${prefix}left `, 'To Move Left')
        .addField(` ${prefix}right `, 'To Move Right')
        .addField(` ${prefix}stop `, 'To Stop')
        .setColor(color)
      msg.channel.send(movement)
    }
  }
})


client.login(process.env.Dtoken || config.Dtoken)
  .catch(error => {
    console.log(`cant login`);
  })
