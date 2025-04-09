const { Client } = require('discord.js-selfbot-v13')
const fs = require("node:fs")
const path = require("node:path")

const prefix = "!"
const client = new Client();

client.commands = new Map();

const cmdpath = path.join(__dirname, 'commands');
const cmdfile = fs.readdirSync(cmdpath).filter(file => file.endsWith('.js'));

for (const file of cmdfile) {
    const command = require(path.join(cmdpath, file));
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log(`${client.user.username} logged`)
})

client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix)) return;

    const arguments = message.content.slice(prefix.length).toString().split(/ +/);
    const cmdName = arguments.shift().toLowerCase();

    const command = client.commands.get(cmdName);

    if (!command) return

    try {
        command.execute(message, arguments);
    } catch (error) {
        console.error(error)
        message.reply("Something went wrong: "+ error)
    }
})

client.login('MTM1ODk3OTQ2MjM1OTk0MTIxMg.GWHx_o.l7_FSdgPLVpjV4TosF094CAfIaBscZD4Noohm0')
