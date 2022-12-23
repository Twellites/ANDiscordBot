const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
       .setName('whois')
       .setDescription('Shows information about a user')
       .addUserOption(option => option.setName('user').setDescription('who this guy').setRequired(false)),
       async execute(interaction) {
        const user = interaction.options.getMember('user') || interaction.user;
        const member = interaction.guild.members.cache.fetch(user.id);
        const icon = user.displayAvatarURL();
        const tag = user.tag;

        const embed = new EmbedBuilder()
        .setColor("Black")
        .setAuthor({ name: tag, iconURL: icon })
        .setThumbnail(icon)
        addFields({ name: "Member", value: '${user}',  inline: false})
        .addFields({ name: "Roles", value: '${member.roles.cache.map(r => r).join inline: false}) 

        




        





}}}
