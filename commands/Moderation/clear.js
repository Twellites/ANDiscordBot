const { SlashCommandBuilder } = require('@discordjs/builders')
const {EmbedBuilder, PermissionsBitField, Embed} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Deletes a specific number of messages from a channel')
    .addIntegerOption(option => option.setName('amount').setDescription('The amount of messages to delete').setMinValue(1).setMaxValue(100).setRequired(true)),
    async execute (interaction, client) {

        const amount = interaction.options.getInteger('amount');
        const channel = interaction.channel;

        if(!interaction.member.permissions.has(PermissionsBitField.ManageMessages)) return await interaction.reply({ content: "You dont have permission to execute this command", ephemeral: true});
        if (!amount) return await interaction.reply({ content: "please specify the amount of messages you want to delete", ephemeral: true});
        if (amount > 100 || amount < 1) return await interaction.reply({ content: "Please selsect a number *between* 100 and 1", ephemeral: true});

        await interaction.channel.bulkDelete(amount).catch( err => {
            return;
        });

        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setDescription(':white_check_mark: Deleted **100** messages.')

        await interaction.reply({ embeds: [embed] }).catch(err => {
            return;
        });
    }

}