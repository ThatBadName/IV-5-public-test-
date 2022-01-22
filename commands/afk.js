const { MessageEmbed } = require("discord.js")
const DB = require("../models/AFK")

module.exports = {
    name: 'afk',
    description: 'An AFK system that will tell users that you are AFK if pinged',
    category: 'Fun',
    slash: true,
    testOnly: true,
    requireRoles: true,
    options: [
        {
            name: 'set',
            type: 'SUB_COMMAND',
            description: 'Set your AFK',
            options: [
                {
                    name: 'status',
                    description: 'Set your AFK status',
                    type: 'STRING',
                    required: true,
                },
            ],
        },
        {
            name: 'return',
            type: 'SUB_COMMAND',
            description: 'Return from AFK',
        },
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    callback: async ({interaction}) => {
        const { guild, options, user, createdTimestamp } = interaction

        const embed = new MessageEmbed()
        .setAuthor(user.tag, user.displayAvatarURL({dynamic: true}))

        const afkStatus = options.getString('status')

        try {

            switch(options.getSubcommand()) {
                case 'set' : {
                    await DB.findOneAndUpdate(
                        {GuildID: guild.id, UserID: user.id},
                        {Staus: afkStatus, Time: parseInt(createdTimestamp / 1000)},
                        {new: true, upsert: true}
                        )

                        embed.setColor("GOLD").setDescription(`You AFK status has been updated to: ${afkStatus}`)
                        return interaction.reply({embeds: [embed], ephemeral: true})
                }
                case 'return' : {
                    await DB.deleteOne({GuildID: guild.id, UserID: user.id})

                    embed.setColor("GOLD").setDescription(`You AFK status has been removed`)
                        return interaction.reply({embeds: [embed], ephemeral: true})
                }
            }

        } catch (err) {
            console.log(err)
        }
    }
}