# djs-command-handler
> A simple and easy to use Discord.js Command Handler

## Installation

```sh
npm install djs-command-handler
```

## Setup

1. Start by requiring the required modules and creating the discord client and command handler with the command directory, prefixes, owners and disabled commands.

```js
const Discord = require('discord.js');
const Client = new Discord.Client();
const { Handler } = require('djs-command-handler');
Client.Handler = new Handler(Client, {
  directory: `${__dirname}/commands/`,
	prefixes: [ '!', '!!' ],
	owners: [ '289232137570222083' ],
  disabled: []
});
```

2. Now create the commands folder and a command inside of it, we're going to add this to it. All of the options aren't required but you do need to have the name else it'll stop the bot with an error saying the command doesn't have a name.

```js
const { Command } = require('djs-command-handler')
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
module.exports = PingCommand
```

3. That's it!, your all done. Additionally there's default commands, eval, help, and ping, which are only usable by the owner(s).

