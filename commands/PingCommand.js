const Command = require('../Command.js')
const fetch = require('node-fetch')

class PingCommand extends Command {
	constructor() {
		super({
			name: "ping",
			description: "Checks the bots ping to the guild.",
			category: "util"
		})
	}
	async run(msg, args, Client) {
		new Promise((resolve, reject) => {
			const start = Date.now()
			fetch('https://discordapp.com/api/v6/channels/${msg.channel.id}/typing', {
				method: "post",
				headers: {
					"Authorization": `Bot ${Client.token}`
				}
			}).then(() => {
				const time = Date.now() - start
				resolve(time)
				msg.channel.send(`:ping_pong: Pong! Ping: \`${time}ms\` API: \`${Math.round(Client.ping)}\``)
			}).catch(err => {
				reject(err)
			})
		})
	}
}
module.exports = PingCommand
