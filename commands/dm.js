const DiscordJS = require('discord.js')

module.exports = {
    name: 'dm',
    description: 'DM a member',
    category: 'Owner',

    // permissions: '',
    // requireRoles: true,
    ownerOnly: true,
    testOnly: true,

    slash: true,

    options: [
        {
            name: 'user',
            description: 'The user to DM',
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.USER,
        },
        {
            name: 'message',
            description: 'The message to send to the user',
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
        },
    ],

    callback: ({ user, options, interaction, err }) => {
        const target = interaction.options.getMember('user')
        var message = interaction.options.getString('message')
        var message = message.replace("//", "\n")

        try {
            target.send(message)
            return ({
                custom: true,
                content: 'Sent message',
                ephemeral: true,
            })
        } catch (err) {
            console.log(err)
            return ({
                custom: true,
                content: 'Failed to send message',
                ephemeral: true,
            })
        }
    }

}