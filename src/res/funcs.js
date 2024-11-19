import { NAME_PREFIX } from './constants.js';

/**
 * @param {Guild} guild
 * @returns {Promise<Role>}
 */
const getOrCreateRole = async (guild) => {
    
    return guild.roles.cache.find(role => role.name === 'to be renamed') || 
        guild.roles.create({
            name: 'to be renamed',
            color: '#ff0000',
            reason: 'rename this',
        });
}

/**
 * 
 * @param {GuildMember} member
 */
export const rename = async (member) => {
    console.log(member.nickname);
    if (!member.manageable) return false;
    const name = member.nickname || member.user.username;

    if (name.startsWith(NAME_PREFIX)) return false;
    if (name.toLowerCase().startsWith(NAME_PREFIX.toLocaleLowerCase())) {
        await member.setNickname(`${NAME_PREFIX}${name.substring(NAME_PREFIX.length)}`);
        return true;
    }

    let role = await getOrCreateRole(member.guild);

    await member.setNickname(`${NAME_PREFIX}${member.nickname}`);
    await member.roles.add(role);
    return true;
}

/**
 * add the prefix to the nickname of all members
 * @param {Map<String, Member>} members 
 * @returns number of members renamed
 */
export const renameAll = async (members) => {
    let i = 0;

    members = members.filter(m => m.manageable);
    const role = await getOrCreateRole(members.first().guild);
    const renamePromises = [];

    for (let member of members) {
        member = member[1];
        let name = member.nickname || member.user.username;
        if(name.startsWith(NAME_PREFIX)) continue;
        await member.roles.add(role);
        if(name.toLowerCase().startsWith(NAME_PREFIX.toLocaleLowerCase())) {
            renamePromises.push(member.setNickname(`${NAME_PREFIX}${name.substring(NAME_PREFIX.length)}`));
        } else {
            renamePromises.push(member.setNickname(`${NAME_PREFIX}${name}`));
        }
        i++;
    }
    await Promise.all(renamePromises);
    return i;
}

/**
 * rempve the prefix from the member's nickname
 * @param {Member} member 
 * @returns 
 */
export const renameBack = (member) => {
    if (!member.manageable) return;
    const name = member.nickname || member.user.username;
    if (!name.startsWith(NAME_PREFIX)) return;
    member.setNickname(name.replace(NAME_PREFIX, ''));
}