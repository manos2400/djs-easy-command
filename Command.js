class Command {
    constructor(options = {}) {
        this.name = options.name
        this.aliases = options.aliases || []
        this.description = options.description || null
        this.category = options.category || null
        this.usage = options.usage || null
        this.owner = options.owner || false
        this.nsfw = options.nsfw || false
        this.disabled = options.disabled || false
        this.permission = options.permission || null
    }
    async run(msg, args, Client) {

    }

    getName() {
        return this.name
    }

    getAliases() {
        return this.aliases
    }

    getDescription() {
        return this.description
    }

    getUsage() {
        return this.usage
    }

    getCategory() {
        return this.category
    }

    isOwner() {
        return this.owner
    }

    isNSFW() {
        return this.nsfw
    }

    isDisabled() {
        return this.disabled
    }

    getPermission() {
        return this.permission
    }
}

module.exports = Command