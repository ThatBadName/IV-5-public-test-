// //to run: node index.js

// const DiscordJS = require("discord.js")
// const dotenv = require("dotenv")
// const WOKCommands = require("wokcommands")
// const path = require("path")
// const mongoose = require("mongoose")
// const { DisTube } = require("distube")
// const { SpotifyPlugin } = require("@distube/spotify")
// const ModmailClient = require('reconlx')
// const client = new DiscordJS.Client({
//     intents: [
//         DiscordJS.Intents.FLAGS.GUILDS,
//         DiscordJS.Intents.FLAGS.GUILD_MESSAGES,
//         DiscordJS.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
//         DiscordJS.Intents.FLAGS.GUILD_MEMBERS,
//         DiscordJS.Intents.FLAGS.GUILD_VOICE_STATES,
//         DiscordJS.Intents.FLAGS.DIRECT_MESSAGES
//     ],
//     partials: ['CHANNEL'],
// })

// client.distube = new DisTube(client, {
//     emitNewSongOnly: true,
//     leaveOnEmpty: true,
//     leaveOnFinish: false,
//     emitAddSongWhenCreatingQueue: false,
//     plugins: [new SpotifyPlugin()]
// })
// module.exports = client


// dotenv.config()

// const testSchema = require('./test-schema')
// const modmailClient = require("./client/modmail")

// const blacklist = require('./models/blacklist-schema')

// client.on('ready', async () => {
//     client.user.setActivity('Back online', { type: 'PLAYING' });
//     modmailClient.ready();
//     console.log('Bot online')

//     new WOKCommands(client, {
//         commandsDir: path.join(__dirname, 'commands'),
//         featuresDir: path.join(__dirname, 'features'),
//         eventsDir: path.join(__dirname, 'events'),
//         testServers: ['919242919829979136', '902937336478834749', '922510520312033290'],
//         botOwners: ['804265795835265034', '561848864005554206', '516254374788595712'],
//         mongoUri: process.env.MONGO_URI,
//         dbOptions: {
//             keepAlive: true
//         }
//       })

//       setTimeout(async () => {
//           await new testSchema({
//               message: 'bot online',
//           }).save()
//       }, 1000)

//       setTimeout(async () => {
//           await client.user.setActivity('I just woke up', { type: 'PLAYING' })
//       }, 5000)

//       setTimeout(async () => {
//         await client.user.setActivity('YouTube', { type: 'WATCHING' })
//     }, 10000)

//     setTimeout(async () => {
//         await client.user.setActivity('my alarm', { type: 'LISTENING' })
//     }, 15000)

//     setTimeout(async () => {
//         await client.user.setActivity('I\'m ready', { type: 'PLAYING' })
//     }, 20000)

//     setTimeout(async () => {
//         await client.user.setActivity('Nothing', { type: 'PLAYING' })
//     }, 25000)
// })


// client.login(process.env.TOKEN)

//to run: node index.js

const DiscordJS = require("discord.js")
const dotenv = require("dotenv")
const WOKCommands = require("wokcommands")
const strikeSchema = require('./models/strike-schema')
const historySchema = require('./models/history-schema')
const path = require("path")
const { MessageEmbed } = require('discord.js')
const mongoose = require("mongoose")
const { DisTube } = require("distube")
const { SpotifyPlugin } = require("@distube/spotify")
const client = new DiscordJS.Client({
    intents: [
        DiscordJS.Intents.FLAGS.GUILDS,
        DiscordJS.Intents.FLAGS.GUILD_MESSAGES,
        DiscordJS.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        DiscordJS.Intents.FLAGS.GUILD_MEMBERS,
        DiscordJS.Intents.FLAGS.GUILD_VOICE_STATES,
        DiscordJS.Intents.FLAGS.DIRECT_MESSAGES
    ]
})

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnEmpty: true,
    leaveOnFinish: false,
    emitAddSongWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin()]
})
module.exports = client


dotenv.config()

const testSchema = require('./test-schema')

client.events = require("./events/ticket/ticketSystem")


client.on('ready', async () => {
    client.user.setActivity('Back online', { type: 'PLAYING' });
    //await mongoose.connect(
        //process.env.MONGO_URI,
        //{
            //keepAlive: true,
        //})
    console.log('Bot online')

    new WOKCommands(client, {
        commandsDir: path.join(__dirname, 'commands'),
        featuresDir: path.join(__dirname, 'features'),
        //eventsDir: path.join(__dirname, 'events'), 
        testServers: ['919242919829979136', '902937336478834749', '922510520312033290'],
        botOwners: ['804265795835265034', '561848864005554206', '516254374788595712'],
        mongoUri: process.env.MONGO_URI,
        dbOptions: {
            keepAlive: true
        }
      })

    //   setTimeout(async () => {
    //       await new testSchema({
    //           message: 'hello world :)',
    //       }).save()
    //   }, 1000)
    
    setTimeout(async () => {
        await client.user.setActivity('Waking up (0%)', { type: 'PLAYING' })
    }, 1000)
    
    setTimeout(async () => {
          await client.user.setActivity('Waking up (10%)', { type: 'PLAYING' })
      }, 2000)

      setTimeout(async () => {
        await client.user.setActivity('Waking up (48%)', { type: 'PLAYING' })
    }, 4000)
    
    setTimeout(async () => {
        await client.user.setActivity('Waking up (99%)', { type: 'PLAYING' })
    }, 7000)

    setTimeout(async () => {
        await client.user.setActivity('I\'m ready', { type: 'PLAYING'})
    }, 12000)

    setTimeout(async () => {
        client.user.setActivity(' ', { type: ' ' })
    }, 20000)
})

client.on("messageCreate", async (message) => {
    if (!message.guild) return;
 
    const words = ['nigg', 'Nigg', 'NIGG', 'n1gg', 'N1gg', 'N1GG', 'n!gg', 'N!gg', 'N!GG', 'filtertest1234%%__']

    for (const word of words) {

        if (message.content.includes(word)) {
            const guild = message.guild
            const logChannel = guild.channels.cache.find(channel => channel.name === 'twisted-logs')
            const user = message.author
            const staff = '919242400738730005'
            const reason = `Saying a blacklisted word (message bellow):\n\n\`\`\`${message.content}\`\`\``
            try {
                message.delete();
                message.channel.send(`${user}, Please don't say that`)

                const strike = await strikeSchema.create({
                    userId: user?.id,
                    staffId: '919242400738730005',
                    guildId: guild?.id,
                    reason,
                })
    
                historySchema.create({
                    userId: user?.id,
                    staffId: '919242400738730005',
                    guildId: guild?.id,
                    reason,
                    punishmentId: strike.id,
                    type: 'strike',
                })
    
                const logEmbed = new MessageEmbed()
                    .setColor('PURPLE')
                    .setTitle('STRIKE ADD')
                    .setDescription(`${user} has been striken`)
                    .addField("Staff:", `[AUTOMOD]`)
                    .addField("Reason:", `Saying a blacklisted word (message bellow):\n\n\`\`\`${message.content}\`\`\``)
                    .addField("ID:", `\`${strike.id}\``)
    
                logChannel.send({embeds: [logEmbed]})
    
                const embed = new MessageEmbed()
                    .setColor('DARK_RED')
                    .setTitle(`**You have been striken [AUTOMOD]**`)
                    .addField("Server:", `${guild}`)
                    .addField("Reason:", `Saying a blacklisted word (message bellow):\n\n\`\`\`${message.content}\`\`\``)
                    .addField("ID:", `\`${strike.id}\``)
                    .setDescription('[Appeal here](https://forms.gle/27o21fUYCzZodosU9)')
                    .setFooter('To view all strikes do \'/liststrikes\'')
    
                await user.send({embeds: [embed]}).catch((err) => {
                    console.log(err)
                })
            } catch (err) {
                console.log(err)
            }
        }
        
        
    }
})

// client.on("messageCreate", async (message) => {
//     if (!message.guild) return;

//     const links = ['discord.gg/', 'discord.com/invite/', 'gg/', '.gg/', 'http://', 'https://']

//     for (const link of links) {

//         if (message.content.includes(link) && !message.author.hasPermission('MANAGE_MESSAGES') && message.channel !== '925026166572712018' || '925028112918511657' || '927700090716557402') {
//             const guild = message.guild
//             const logChannel = guild.channels.cache.find(channel => channel.name === 'twisted-logs')
//             const user = message.author
//             const staff = '919242400738730005'
//             const reason = `Posting a link in a non-advertising channel (message bellow):\n\n\`\`\`${message.content}\`\`\``
//             try {
//                 message.delete();
//                 message.channel.send(`${user}, Please don't say that`)

//                 const strike = await strikeSchema.create({
//                     userId: user?.id,
//                     staffId: '919242400738730005',
//                     guildId: guild?.id,
//                     reason,
//                 })
    
//                 historySchema.create({
//                     userId: user?.id,
//                     staffId: '919242400738730005',
//                     guildId: guild?.id,
//                     reason,
//                     punishmentId: strike.id,
//                     type: 'strike',
//                 })
    
//                 const logEmbed = new MessageEmbed()
//                     .setColor('PURPLE')
//                     .setTitle('STRIKE ADD')
//                     .setDescription(`${user} has been striken`)
//                     .addField("Staff:", `[AUTOMOD]`)
//                     .addField("Reason:", `Saying a blacklisted word (message bellow):\n\n\`\`\`${message.content}\`\`\``)
//                     .addField("ID:", `\`${strike.id}\``)
    
//                 logChannel.send({embeds: [logEmbed]})
    
//                 const embed = new MessageEmbed()
//                     .setColor('DARK_RED')
//                     .setTitle(`**You have been striken [AUTOMOD]**`)
//                     .addField("Server:", `${guild}`)
//                     .addField("Reason:", `Saying a blacklisted word (message bellow):\n\n\`\`\`${message.content}\`\`\``)
//                     .addField("ID:", `\`${strike.id}\``)
//                     .setDescription('[Appeal here](https://forms.gle/27o21fUYCzZodosU9)')
//                     .setFooter('To view all strikes do \'/liststrikes\'')
    
//                 await user.send({embeds: [embed]}).catch((err) => {
//                     console.log(err)
//                 })
//             } catch (err) {
//                 console.log(err)
//             }
//         }
        
//     }
// })


client.login(process.env.TOKEN)