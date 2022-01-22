// const {
//     Client
// } = require('discord.js')
// const welcomeSchema = require('../models/welcome-schema')

// const welcomeData = {}

// module.exports = (client, channel) => {
//     client.on('guildMemberAdd', async member => {
//         const {
//             guild,
//             id
//         } = member

//         let data = welcomeData[guild.id]

//         if (!data) {
//             const results = await welcomeSchema.findById(guild.id)
//             if (!results) {
//                 return
//             }

//             const {
//                 channelID,
//                 text
//             } = results
//             const channel = guild.channels.cache.get(channelID)
//             data = welcomeData[guild.id] = [channel, text]
//         }

//         data[0].send({
//             content: data[1].replace(/@/g, `<@${id}>`)
//         })
//     })
// }

//     module.exports.config = {
//         displayName: 'Welcome Channel',
//         dbName: 'WELCOME_CHANNEL',
//     }