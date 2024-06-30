const fetch = require('node-fetch');

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`${client.user.tag} is logged in and online`);

    // Configurando o keep-alive
    setInterval(() => {
      fetch('https://discordbot-tjld.onrender.com')  
        .then(res => res.text())
        .then(text => console.log('Keep-alive:', text))
        .catch(err => console.error('Erro ao manter o bot ativo:', err));
    }, 5 * 60 * 1000); 
};
