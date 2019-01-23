const Command = require('../Command.js')

class PrefixCommand extends Command {
    constructor() {
        super({
            name: "prefix",
            description: "Changes the prefix to the guild.",
            category: "moderation"
        })
    }
    async run(msg, args, Client) {
        if (!msg.member.hasPermission('MANAGE_GUILD')) return msg.reply("You seem to be missing the permission `Manage Server`.")
        if (!args[0]) {
            Client.db.find({ id: msg.guild.id }, (err, data) => {
                if (err) console.error(err)
                if (!data[0]) return msg.reply(`There isn't a prefix set. Set one using \`${Client.prefixes[0]}prefix <prefix>\`, \`<prefix>\` being the desired prefix.`)
                return msg.reply(`The guild prefix is \`${data[0].prefix}\``)
            })
        } else {
            Client.db.find({ id: msg.guild.id }, async (err, data) => {
                if (!data[0]) {
                    await Client.db.insert({ id: msg.guild.id, prefix: args.join(' ') }, (err, data) => {
                        if (err) console.error(err)
                    })
                } else {
                    await Client.db.update({ id: msg.guild.id }, { $set: { prefix: args.join(' ') } }, (err, data) => {
                        if (err) console.error(err)
                    })
                }
                Client.guildPrefixes.set(msg.guild.id, args.join(' '))
                msg.reply(`The guild prefix has been set to: ${args.join(' ')}`)
            })
        }
    }
}
module.exports = PrefixCommand
