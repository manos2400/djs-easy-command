# djs-easy-command
> A simple and easy to use Discord.js Command Handler

## Installation

```sh
npm install djs-easy-command
```

## Setup

1. Start by requiring the required modules and creating the discord client and command handler with the command directory, prefixes, owners and disabled commands.

```js
const Discord = require('discord.js');
const Client = new Discord.Client();
const { Handler } = require('djs-easy-command');
Client.Handler = new Handler(Client, {
	directory: `${__dirname}/commands/`,
	prefixes: [ '!', '!!' ],
	owners: [ '289232137570222083' ],
	disabled: []
});
Client.login('token')
```

2. Now create the commands folder in the bot directory and a command inside of it, we're going to add this to it. All of the options aren't required but you do need to have the name else it'll stop the bot with an error saying the command doesn't have a name.

```js
const { Command } = require('djs-easy-command')
class TestCommand extends Command {
	constructor(){
		super({
			name: 'test',
			aliases: [ 'testing' ],
			description: 'A test command',
			category: 'fun',
			usage: 'test',
			owner: false,
			nsfw: false,
			disabled: false
		})
	}
	async run(msg, args, Client) {
		return msg.reply('testing!')
	}
}
module.exports = TestCommand
```

3. That's it!, your all done. Additionally there's default commands, eval, help, and ping, eval is only usable by the owner(s).

