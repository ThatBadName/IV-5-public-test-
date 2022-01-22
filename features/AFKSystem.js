const { Message, MessageEmbed } = require('discord.js')
const DB = require('../models/AFK')

module.exports = {
    name: 'messageCreate',

    async execute(message) {
        if(message.author.bot) return;

        if(message.mentions.members.size) {
            const embed = new MessageEmbed()
            .setColor("GOLD")
            message.mentions.members.forEach((m) => {
                DB.findOne({GuildID: message.guild,id, UserID: m.id}, async (err, data) => {
                    if(err) throw err;
                    if(data)
                    embed.setDescription(`${m} is AFK <t:${data,Time}:R>\n\n**Sataus:**\n${data.Status}`)
                    return message.reply({embeds: [embed]})
                })
            })
        }
    }
}