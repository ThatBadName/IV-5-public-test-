const {
    MessageActionRow,
    MessageButton,
    MessageEmbed
} = require('discord.js');

const wait = require('util').promisify(setTimeout);

module.exports = {
    name: "CoinFlip",
    category: "Games",
    description: "Coin flip game",
    slash: true,
    testOnly: true,
//U need to change the handler to urs
    callback: async ({client, interaction}) => {

        const headsrow = new MessageButton()
            .setCustomId('Heads')
            .setLabel('Heads')
            .setStyle('SUCCESS')

        const tailsrow = new MessageButton()
            .setCustomId('Tails')
            .setLabel('Tails')
            .setStyle('PRIMARY')

        const losstailsrowD = new MessageButton()
            .setCustomId('Tails')
            .setLabel('Tails')
            .setStyle('DANGER')
            .setDisabled(true)

        const lossheadsrowD = new MessageButton()
            .setCustomId('Heads')
            .setLabel('Heads')
            .setStyle('DANGER')
            .setDisabled(true)

        const winheadsrowD = new MessageButton()
            .setCustomId('Heads')
            .setLabel('Heads')
            .setStyle('SUCCESS')
            .setDisabled(true)

        const wintailsrowD = new MessageButton()
            .setCustomId('Tails')
            .setLabel('Tails')
            .setStyle('SUCCESS')
            .setDisabled(true)

        const cfembed = new MessageEmbed()
            .setDescription(`Please choose \`Heads\` or \`Tails\``)
            .setColor("#e91e63")

        const button = new MessageActionRow().addComponents([headsrow, tailsrow])
        const lossbutton = new MessageActionRow().addComponents([lossheadsrowD, losstailsrowD])
        const winbutton = new MessageActionRow().addComponents([winheadsrowD, wintailsrowD])

        try {

            await interaction.reply({
                embeds: [cfembed],
                components: [button]
            });

            const items = ['Heads', 'Tails']

            const answer = items[Math.floor(Math.random() * items.length)];

            const headwin = new MessageEmbed()
                .setTitle(`Victory 🎉🥳`)
                .setColor("#e91e63")
                .setDescription(`**${interaction.author.username} chose:** Heads\n**The coin landed on:** Heads`)

            const tailswin = new MessageEmbed()
                .setTitle(`Victory 🎉🥳`)
                .setColor("#e91e63")
                .setDescription(`**${interaction.author.username} chose:** Tails\n**The coin landed on:** Tails`)

            const headloss = new MessageEmbed()
                .setTitle(`Defeat 🙊`)
                .setColor("#e91e63")
                .setDescription(`**${interaction.author.username} chose:** Heads\n**The coin landed on:** Tails`)

            const tailsloss = new MessageEmbed()
                .setTitle(`Defeat 🙊`)
                .setColor("#e91e63")
                .setDescription(`**${interaction.author.username} chose:** Tails\n**The coin landed on:** Heads`)

            const filter = i => {
                return i.user.id === interaction.author.id;
            };

            const collector = interaction.channel.createMessageComponentCollector({
                filter,
                time: 7500
            });

            collector.on('collect', async i => {
                await i.deferUpdate();
                await wait(750)

                if (i.customId === 'Heads') {
                    if (answer === 'Heads') {
                        await i.editReply({
                            embeds: [headwin],
                            components: [winbutton]
                        });
                    } else {
                        await i.editReply({
                            embeds: [headloss],
                            components: [lossbutton]
                        });

                    }

                } else if (i.customId === "Tails") {
                    if (answer === 'Tails') {

                        await i.editReply({
                            embeds: [tailswin],
                            components: [winbutton]
                        });
                    } else {
                        await i.editReply({
                            embeds: [tailsloss],
                            components: [lossbutton]
                        });
                    }
                }
            })
        } catch (err) {

            const errorembeds = new MessageEmbed()
                .setColor(colors.ERRORRED)
                .setDescription(/*ERROR Message*/)

            interaction.reply({
                embeds: [errorembeds]
            })

            return console.log(`I ran into an error while running CF: ${err}`)
        }

    }
}