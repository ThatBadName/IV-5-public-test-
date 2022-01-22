const { Client, Message, MessageEmbed } = require('discord.js')
const modmailClient = require('../client/modmail')

module.exports = {
    callback: async (client, message, args) => {
        const reason = args.join(" ") || 'None'

        modmailClient.deleteMail({ channel: message.channel.id, reason })
    },
}