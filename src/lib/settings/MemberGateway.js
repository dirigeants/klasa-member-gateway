const { Gateway } = require('klasa');

/**
 * The Gateway class that manages the data input, parsing, and output, of an entire database, while keeping a cache system sync with the changes.
 * @extends GatewayStorage
 */
class MemberGateway extends Gateway {

	/**
	 * The ID length for all entries.
	 * @since 0.0.1
	 * @type {number}
	 * @readonly
	 * @private
	 */
	get idLength() {
		// 18 + 1 + 18: `{MEMBERID}.{GUILDID}`
		return 37;
	}

	/**
	 * Gets an entry from the cache or creates one if it does not exist
	 * @since 0.5.0
	 * @param {*} target The target that holds a Settings instance of the holder for the new one
	 * @param {string} [id = `${target.guild.id}.${target.id}`] The settings' identificator
	 * @returns {Settings}
	 */
	acquire(target, id = `${target.guild.id}.${target.id}`) {
		return super.acquire(target, id);
	}

	/**
	 * Get a Settings entry from this gateway
	 * @since 0.0.1
	 * @param {string} id The id for the instance to retrieve
	 * @returns {?external:Settings}
	 */
	get(id) {
		const [guildID, memberID] = id.split('.');
		const guild = this.client.guilds.get(guildID);
		if (guild) {
			const member = guild.members.get(memberID);
			return (member && member.settings) || null;
		}

		return null;
	}

	/**
	 * Create a new Settings for this gateway
	 * @since 0.0.1
	 * @param {*} target The holder for this Settings instance
	 * @param {string} [id = `${target.guild.id}.${target.id}`] The id for this instance
	 * @returns {external:Settings}
	 */
	create(target, id = `${target.guild.id}.${target.id}`) {
		return super.create(target, id);
	}

}

module.exports = MemberGateway;
