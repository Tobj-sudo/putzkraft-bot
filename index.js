require('dotenv').config(); //initializes dotenv
const Discord = require('discord.js'); //imports discord.js

const client = new Discord.Client({ intents: [
  Discord.GatewayIntentBits.Guilds,
  Discord.GatewayIntentBits.GuildMessages,
  Discord.GatewayIntentBits.MessageContent,
  Discord.GatewayIntentBits.GuildMembers
]});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', msg => {
  if(msg.content === 'putz'){
    msg.reply('putze...');
  }
});




client.login(process.env.CLIENT_TOKEN); 