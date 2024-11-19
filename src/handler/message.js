import { renameAll, renameBack } from '../res/funcs.js';

const name = async (msg) => {
    msg.reply(`${await renameAll(await msg.guild.members.fetch())} members renamed`);
}

const rollback = async (msg) => {
    (await msg.guild.members.fetch()).forEach(member => renameBack(member));
}

const clear = async (msg) => {
   msg.guild.roles.cache.find(role => role.name === 'to be renamed').delete();
}

/**
 * @type {Object.<string, (msg: Message) => void>}
 */
const resposnses = {
    putz: (msg) => msg.reply('putze...'),
    name: name,
    rollback: rollback,
    clear: clear
}


/**
 * @param {Message} msg 
 */
export const handleMessage = async (msg) => {
    console.log(msg.content);
    if(resposnses[msg.content]) resposnses[msg.content](msg);
}