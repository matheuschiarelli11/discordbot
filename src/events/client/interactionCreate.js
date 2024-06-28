const { Collection } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const { commands, cooldowns } = client;
    const { commandName } = interaction;
    const command = commands.get(commandName);
    if (!command) return;

    if (!cooldowns.has(command.data.name)) {
      cooldowns.set(command.data.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.data.name);
    const defaultCooldownDuration = 3; // em segundos
    const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

    if (timestamps.has(interaction.user.id)) {
      const expirationTime =
        timestamps.get(interaction.user.id) + cooldownAmount;

      if (now < expirationTime) {
        const cooldownMessage = command.cooldownMessage
          ? command.cooldownMessage
          : `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`;

        const expiredTimestamp = Math.round(expirationTime / 1000);
        return interaction.reply({
          content: cooldownMessage,
          ephemeral: true,
        });
      }
    }

    timestamps.set(interaction.user.id, now);
    setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

    try {
      await command.execute(interaction, client);
    } catch (error) {
      console.log(error);
      await interaction.reply({
        content: `Something went wrong!`,
        ephemeral: true,
      });
    }
  },
};
