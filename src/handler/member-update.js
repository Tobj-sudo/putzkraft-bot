import { createAudioResource, joinVoiceChannel, createAudioPlayer, AudioPlayerStatus} from '@discordjs/voice';
import { NAME_PREFIX } from "../res/constants.js";
import { rename } from "../res/funcs.js";

const player = createAudioPlayer();

/**
 * Handle member update event
 * @param {Member} oldMember 
 * @param {Member} newMember 
 * @returns {Promise<void>} 
 */
export const handleMemberUpdate = async (oldMember, newMember) => {
    if (oldMember.nickname == newMember.nickname) return;
    if (newMember.nickname.startsWith(NAME_PREFIX)) return;

    const voiceChannel = newMember.voice.channel;
    if (voiceChannel) {
        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: voiceChannel.guild.id,
            adapterCreator: voiceChannel.guild.voiceAdapterCreator
        });
        
        connection.subscribe(player);
        player.play(createAudioResource('assets/audio/nein.mp3'));
        
        player.on(AudioPlayerStatus.Idle, () => {
            connection.disconnect();
        });
    }
    rename(newMember);
};