const Eris = require("eris");
const keep_alive = require('./keep_alive.js')

// Replace TOKEN with your bot account's token
const bot = new Eris("MTE5OTQ4ODQ1Mzg3MjcyMTk0MQ.G25FiN.7lTEIzG02dszk6OsMDNxCp9e0lp5s8AAW86T0E");

bot.on("error", (err) => {
  console.error(err); // or your preferred logger
});

bot.connect(); // Get the bot to connect to Discord
