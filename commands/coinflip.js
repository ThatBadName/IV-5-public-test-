const DiscordJS = require('discord.js')

module.exports = {
    category: 'Fun',
    description: 'Flips a coin',
    name: 'Coin',

    //permissions: ['ADMINISTRATOR'],
    requireRoles: true,

    slash: true,
    testOnly: true,

    guildOnly: true,

    callback: ({ message, interaction, channel, args, options }) => {
        const random = Math.round(Math.random())

        if (random === 0) {
        interaction.reply({
            content: `Its heads`,
        })
        } else if (random === 1) {
            interaction.reply({
                content: `Its tails`,
            })
        }
        
    }
}