const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
} = require("@discordjs/voice");

const ytdl = require("ytdl-core");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("admincmd")
    .setDescription("ATENÇÃO! comando perigoso, use com moderação"),
  async execute(interaction, client) {
    const rickroll = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) {
      return interaction.reply(
        "Você precisa estar em um canal de voz para usar este comando!"
      );
    }

    try {
      const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: interaction.guild.id,
        adapterCreator: interaction.guild.voiceAdapterCreator,
      });

      const player = createAudioPlayer();

      const stream = ytdl(rickroll, { filter: "audioonly" });
      const resource = createAudioResource(stream);

      // Conecta o player ao canal de voz e começa a tocar a música
      player.play(resource);
      connection.subscribe(player);
    } catch (error) {
      console.log(error);
    }
  },
};
