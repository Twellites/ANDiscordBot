const { SlashCommandBuilder } = require("@discordjs/builders");
const { execute } = require("./clear")

module.exports = {
    data: new SlashCommandBuilder()
    .setName('verify')
    .setDescription("Get verified in the discord server"),
    async execute (interaction, client) {
        const role = interaction.guild.role.cache.find( r => r.name === 'Verified')

        const member = interaction.member;

        member.roles.add(role);

        await interaction.reply({ content: "You are now verified within the server", ephemeral: true});
    }
}