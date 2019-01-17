const { Command } = require('djs-commands')
const util = require('util')
const terminal = require('node-cmd')

class EvalCommand extends Command {
    constructor() {
        super({
            name: 'eval',
            aliases: ['e', 'ev', 'evalulate'],
            description: 'Evaluates code',
            usage: 'eval [bash] <code>',
            category: 'owner',
            owner: true
        })
    }
    async run(msg, args, Client) {
        if (!args[0]) return msg.channel.send('Eval requires input')
        if (args[0].toLowerCase() == 'bash') {
            let hrDiff
            const hrStart = process.hrtime()
            terminal.get(args.slice(1).join(' '), (err, data) => {
                hrDiff = process.hrtime(hrStart)
                if (err) return msg.channel.send(`Error while evaluating: \`${err}\``)
                return msg.channel.send(`
*Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms.*
\`\`\`md
${data}
\`\`\`
				`, {
                        maxLength: 1900,
                    });
            })
        } else {
            let result
            let hrDiff;
            try {
                const hrStart = process.hrtime();
                result = eval(args.join(' '));
                hrDiff = process.hrtime(hrStart);
            } catch (err) {
                return msg.channel.send(`Error while evaluating: \`${err}\``);
            }
            const inspected = util.inspect(result, {
                depth: 0
            })
            return msg.channel.send(`
*Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms.*
\`\`\`javascript
${inspected}
\`\`\`
			`, {
                    maxLength: 1900,
                });
        }
    }
}
module.exports = EvalCommand
