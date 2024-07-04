require("dotenv").config();
const { token } = process.env;
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const express = require("express");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});
client.commands = new Collection();
client.cooldowns = new Collection();
client.commandArray = [];

// Verifique se o token está sendo carregado corretamente
console.log("Bot token:", token);

console.log("Initializing bot...");

const functionFolders = fs.readdirSync("./src/functions");
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));

  for (const file of functionFiles) {
    require(`./functions/${folder}/${file}`)(client);
    console.log(`Loaded function file: ${file}`);
  }
}

console.log("Handling events...");
client.handleEvents();

console.log("Handling commands...");
client.handleCommands();

client.login(token)
  .then(() => {
    console.log(`${client.user.tag} is logged in and online`);
  })
  .catch(err => {
    console.error("Error logging in:", err);
  });

// Inicializando o servidor Express
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Bot is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
