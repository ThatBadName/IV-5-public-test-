const { ModMailClient } = require("reconlx")
const client = require('../index')

const modmailClient = new ModMailClient({
    client,
    guildId: '919242919829979136',
    category: '925316961200668704',
    modmailRole: '919630315209752577',
    mongooseConnectionString: 'mongodb+srv://Twisted:R5Wc2yCEPhwYlqnB@twisted-binary.ybriy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    transcriptChannel: '925317112526946306',
});

module.exports = modmailClient;