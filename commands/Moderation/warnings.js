const { SlashCommandBuilder } = require("@discord.js/builders")
const { PermissionsBitField, EmbedBuilder, PermissionOverwriteManager } = require('discord.js')
const { QuickDB } = require('quick.db')
const db = new QuickDB();

module.exports = {
    data: new SlashCommandBuilder()
    .setName("warnings")
    .setDescription("how many warns bruv")
    .addUserOption(option => option.setName('target').setDescription("how many warns this guy have?").setRequired(true))
    .addNumberOption(option => option.setName('number').setDescription('clear number of warns').setRequired(true))
    ,async execute (interaction) {
        
        const member = interaction.options.getUser('taget');
        const warnNum = interaction.options.getNumber('number');
        let warns = await db.get('warns_${member}');

        if (warnNum > warns) return await interaction.reply({content: 'you can only clear a max of ${warns} warnings from ${member.tag}', ephemeral: true})

        let afwarns = await db.sub('warns_${member}', warnNum)

        if (warns == null) wanrs = 0;

        const Embed = new EmbedBuilder()
        .setColor("DarkButNotBlack")
        .setDescription(':white_check_mark: ${member.tag} dis guy been warned | ${reason}')

        await interaction.reply({embeds: [embed]});

        
    }

}