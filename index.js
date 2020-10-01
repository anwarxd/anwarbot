const Discord = require('discord.js');
const client = new Discord.Client();

const PREFIX = '!';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


    // Ping Command //
    client.on('message', message => {
        if (message.content === PREFIX + 'ping') {
        message.reply('pong');
        }
    });

    // Avatar Command //
    client.on('message', message => {
        if (message.content === PREFIX + 'avatar') {
          message.reply(message.author.displayAvatarURL());
        }
      });

      // Welcome Message //
      client.on('guildMemberAdd', member => {
        const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
        if (!channel) return;
        channel.send(`Welcome to the server, ${member}`);
      });

      // Message Embed //
      client.on('message', message => {
        if (message.content === PREFIX + 'embed help') {
          const embed = new MessageEmbed()
            .setTitle('A slick little embed')
            .setColor(0xff0000)
            .setDescription('Hello, this is a slick embed!');
          message.channel.send(embed);
        }
      });

      // Moderation Command //
      client.on('message', message => {
        if (!message.guild) return;
        if (message.content.startsWith('!kick')) {
          const user = message.mentions.users.first();
          if (user) {
            const member = message.guild.member(user);
            if (member) {
              member
                .kick('Optional reason that will display in the audit logs')
                .then(() => {
                  message.reply(`Successfully kicked ${user.tag}`);
                })
                .catch(err => {
                  message.reply('I was unable to kick the member');
                  console.error(err);
                });
            } else {
              message.reply("That user isn't in this guild!");
            }
          } else {
            message.reply("You didn't mention the user to kick!");
          }
        }
      });


client.login('process.env.BOT_TOKEN');
