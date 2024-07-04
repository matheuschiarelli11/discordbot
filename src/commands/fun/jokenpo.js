const { RockPaperScissors } = require("discord-gamecord");
const { SlashCommandBuilder, ButtonStyle } = require("discord.js");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("jokenpo")
    .setDescription("Jogue pedra-papel-tesoura com alguém!")
    .addUserOption((option) =>
      option
        .setName("opponent")
        .setDescription("Desafie alguém para jogar contra você")
        .setRequired(true)
    ),
  async execute(interaction) {
    const { options } = interaction;
    const opponent = options.getUser("opponent");

    const Game = new RockPaperScissors({
      message: interaction,
      isSlashGame: true,
      opponent: opponent,
      embed: {
        title: "Pedra Papel Tesoura",
        color: "#FFFFFF",
        description: "Escolha uma opção abaixo.",
      },
      buttons: {
        rock: "Pedra",
        paper: "Papel",
        scissors: "Tesoura",
      },
      emojis: {
        rock: "🌑",
        paper: "📰",
        scissors: "✂",
      },
      mentionsUser: true,
      timeoutTime: 60000,
      ButtonStyle: "PRIMARY",
      pickMessage: "Você escolheu {emoji}",
      winMessage: "**{player}** ganhou! Parabéns!",
      tieMessage: "Empate! Ninguém ganhou essa",
      timeoutMessage: "O jogo não foi finalizado a tempo, ninguém ganhou.",
      playerOnlyMessage: "Apenas {player} e {opponent} podem usar os botões.",
    });

    Game.startGame();
  },
};
