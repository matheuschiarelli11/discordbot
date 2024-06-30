const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const images = require("../../images.json");

module.exports = {
  cooldown: 43200,
  cooldownMessage: "Seu Juan diário já foi definido, volte amanhã!",
  data: new SlashCommandBuilder()
    .setName("juan")
    .setDescription("Responde com uma imagem!"),
  async execute(interaction, client) {
    const guildId = "905606393652969494";

    if (
      interaction.guild.id !== guildId ||
      interaction.user.id !== "269669297771511809"
    ) {
      return interaction.reply({
        content: "This command can't be evoked here.",
        ephemeral: true,
      });
    }
    try {
      const botAvatarURL = client.user.displayAvatarURL();
      const displayName = interaction.member.displayName;
      const randomImage = images[Math.floor(Math.random() * images.length)];
      const embed = new EmbedBuilder()
        .setTitle(randomImage.title)
        .setDescription(randomImage.description)
        .setColor("#1C35D3")
        .setImage(randomImage.imageURL)
        .setFooter({
          text: "Volte amanhã para ver um juan diferente (ou talvez o mesmo)",
          inline: true,
          iconURL: botAvatarURL,
        });

      await interaction.reply({
        content: `Este é o Juan diário de ${displayName}`,
        embeds: [embed],
      });
    } catch (error) {
      console.error("Erro ao executar o comando /embed:", error);
      await interaction.reply({
        content: "Parece que o Juan dormiu de novo, desculpe o imprevisto!",
        ephemeral: true,
      });
    }
  },
};
