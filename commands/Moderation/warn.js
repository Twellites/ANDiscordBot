const { SlashCommandBuilder } = require("@discord.js/builders")
const { PermissionsBitField, EmbedBuilder, PermissionOverwriteManager } = require('discord.js')
const { QuickDB } = require('quick.db')
const db = new QuickDB();

module.exports = {
    data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("warn people")
    .addUserOption(option => option.setName('target').setDescription("guy you want to warn").setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('why warn this guy').setRequired(false))
    ,async execute (interaction) {
        if(interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return await interaction.reply({ content: "you dont have perms bruv", ephemeral: true})

        const member = interaction.opttions.getUser('taget');
        let reason = interaction.options.getString('reason');

        if (!reason) reason = "you didnt say why smh"

        const dmEmbed = new EmbedBuilder()
        .setColor("DarkButNotBlack")
        .setDescription(':white_check_mark: you been **warned** bruv in ${interaction.guild.name} | ${reason}')

        const Embed = new EmbedBuilder()
        .setColor("DarkButNotBlack")
        .setDescription(':white_check_mark: ${member.tag} dis guy been warned | ${reason}')

        await interaction.reply({embeds: [embed]});

        await member.send({embeds: [dmEmbed] }).catch(err => {
            return;
        })

        db.add('warns_${member}', 1);

    }

}