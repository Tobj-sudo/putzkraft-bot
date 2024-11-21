import 'dotenv/config'

import Discord from 'discord.js'

import { handleMessage } from  './handler/message.js';
import { handleJoin } from './handler/join.js';
import { handleMemberUpdate } from './handler/member-update.js';

const client = new Discord.Client({ intents: [
  Discord.GatewayIntentBits.Guilds,
  Discord.GatewayIntentBits.GuildMessages,
  Discord.GatewayIntentBits.MessageContent, 
  Discord.GatewayIntentBits.GuildMembers,
  Discord.GatewayIntentBits.GuildVoiceStates,
]});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', handleMessage);
client.on('guildMemberAdd', handleJoin);
client.on('guildMemberUpdate', handleMemberUpdate);

client.login(process.env.CLIENT_TOKEN);