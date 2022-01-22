const { Message } = require('discord.js')
const blacklist = require('../models/blacklist-schema')

module.exports = {
    name: 'blacklist',
    description: 'Manage the blacklist',
    category: 'Config',
    slash: true,
    testOnly: true,
    ownerOnly: true,
    options: [
        {
            name: 'user',
            description: 'The user to target',
            type: 'USER',
            required: true,
        },
        {
            name: 'action',
            description: 'The action to perform',
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: 'add',
                    value: 'add',
                },
                {
                    name: 'remove',
                    value: 'remove',
                },
                {
                    name: 'check',
                    value: 'check',
                },
            ],
        },
        {
            name: 'reason',
            description: 'A reason for the update',
            type: 'STRING',
            required: false,
        },
    ],

    callback: async ({interaction}) => {
        const user = interaction.options.getUser('user')
        const action = interaction.options.getString('action')
        const reason = interaction.options.getString('reason') || 'none'

        if (action === 'add') {
            blacklist.findOne({ id : user.id }, async(err, data) => {
                if(err) throw err
                if(data) {
                    interaction.reply({
                        custom: true,
                        content: `${user} is already on the blacklist`,
                        ephemeral: true,
                    })
                } else {
                    data = new blacklist({ id: user.id, reason: reason })
                }
                data.save()
                .catch(err => console.log(err))
                interaction.reply({custom: true, content: `${user} has been added to the blacklist (${reason})`, ephemeral: true,})
            })
        } else if (action === 'remove') {
            blacklist.findOne({ id : user.id }, async(err, data) => {
                if(err) throw err
                if(data) {
                    interaction.reply({
                        custom: true,
                        content: `${user} is already on the blacklist`,
                        ephemeral: true,
                    })
                } else {
                    data = new blacklist({ id: user.id, reason: reason })
                }
                data.save()
                .catch(err => console.log(err))
                interaction.reply({custom: true, content: `${user} has been added to the blacklist (${reason})`, ephemeral: true,})
            })
        } else if (action === 'check') {

        }
    }
}