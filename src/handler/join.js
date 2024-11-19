import { rename } from '../res/funcs.js';

// TODO Fix
export const handleJoin = async (member) => {
    console.log('User ' + member.user.username + ' has joined the server!');
    rename(member);
};