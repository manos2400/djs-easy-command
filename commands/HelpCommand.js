const Command = require('../Command.js')
const { RichEmbed } = require('discord.js')

class HelpCommand extends Command {
    constructor() {
        super({
            name: "help",
            description: "Shows a list of commands, or a list of commands in a category or a specific command.",
            usage: "help [command | category]"
        })
    }
    async run(msg, args, Client) {
        let embed = new RichEmbed()
        let categories
        if (Client.owners && Client.owners.includes(msg.author.id)) categories = Client.commands.map(command => command.getCategory()).filter(c => ![null].includes(c)).sort();
        else categories = Client.commands.map(command => command.getCategory()).filter(c => ![null, 'owner'].includes(c)).sort();
        let commandsSize = 0
        if (!args[0]) {
            embed.setAuthor('Command list', msg.author.displayAvatarURL)
            categories.forEach(category => {
                let commands = Client.commands.filter(command => command.getCategory() == category && !Client.disabled.includes(command.getName()))
                commands = commands.map(c => c.getName())
                if (commands.length <= 0) return
                commandsSize += commands.length
                embed.addField(`${category.toUpperCase().slice(0, 1) + category.slice(1, category.length)} [ ${commands.length} ]`, `\`${commands.sort().join('`, `')}\``)
            })
            embed.setFooter(`Total commands: ${commandsSize}`)
            return msg.channel.send(embed)
        } else if (args && categories.includes(args[0])) {
            let commands = Client.commands.filter(command => command.getCategory() == args[0].toLowerCase() && !Client.disabled.includes(command.getName()))
            commands = commands.map(c => c.getName())
            embed.setAuthor(`Commands for category: ${args[0].toUpperCase().slice(0, 1) + args[0].toLowerCase().slice(1, args[0].length)}`, msg.author.displayAvatarURL)
            embed.setDescription(`\`${commands.sort().join('`, `')}\``)
            return msg.channel.send(embed)
        } else {
            let command = Client.Handler.getCommand(args[0])
            if (command.error || Client.disabled.includes(command.getName())) return msg.channel.send('I can\'t seem to find that command.')
            embed.setAuthor(`Command help for: ${args[0]}`, msg.author.displayAvatarURL)
            embed.setDescription(command.getDescription())
            if (command.getAliases().length > 0) embed.addField('Aliases:', `\`${command.getAliases().join('`, `')}\``)
            if (command.getUsage() != null) embed.addField('Usage:', command.getUsage())
            return msg.channel.send(embed)
        }
    }
}
module.exports = HelpCommand