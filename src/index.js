import 'dotenv/config'

import Discord from 'discord.js'

import { handleMessage } from  './handler/message.js';
import { handleJoin } from './handler/join.js';


const client = new Discord.Client({ intents: [
  Discord.GatewayIntentBits.Guilds,
  Discord.GatewayIntentBits.GuildMessages,
  Discord.GatewayIntentBits.MessageContent, 
  Discord.GatewayIntentBits.GuildMembers
]});


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', handleMessage);
client.on('guildMemberAdd', handleJoin);


client.login(process.env.CLIENT_TOKEN); 