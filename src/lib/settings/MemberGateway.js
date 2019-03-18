const { GatewayStorage, Settings, util: { getIdentifier } } = require('klasa');

/**
 * The Gateway class that manages the data input, parsing, and output, of an entire database, while keeping a cache system sync with the changes.
 * @extends GatewayStorage
 */
class MemberGateway extends GatewayStorage {

	/**
	 * @since 0.0.1
	 * @param {external:KlasaClient} client The KlasaClient instance which initiated this instance
	 * @param {string} name The name of this Gateway
	 * @param {external:GatewayOptions} [options = {}] The options for this gateway
	 */
	constructor(client, name, options) {
		super(client, name, options);

		/**
		 * The synchronization queue for all Settings instances
		 * @since 0.0.1
		 * @type {WeakMap<string, Promise<external:Settings>>}
		 */
		this.syncMap = new WeakMap();

		/**
		 * @since 0.0.1
		 * @type {boolean}
		 * @private
		 */
		Object.defineProperty(this, '_synced', { value: false, writable: true });
	}

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
	 * @returns {external:Settings}
	 */
	acquire(target) {
		return this.get([target.guild.id, target.id]) || this.create([target.guild.id, target.id]);
	}

	/**
	 * Get a Settings entry from this gateway
	 * @since 0.0.1
	 * @param {string|string[]} id The id for this instance
	 * @returns {?external:Settings}
	 */
	get(id) {
		const [guildID, memberID] = typeof id === 'string' ? id.split('.') : id;

		const guild = this.client.guilds.get(guildID);
		if (guild) {
			const member = guild.members.get(memberID);
			return member && member.settings;
		}

		return undefined;
	}

	/**
	 * Create a new Settings for this gateway
	 * @since 0.0.1
	 * @param {string|string[]} id The id for this instance
	 * @param {Object<string, *>} [data={}] The data for this Settings instance
	 * @returns {external:Settings}
	 */
	create(id, data = {}) {
		const [guildID, memberID] = typeof id === 'string' ? id.split('.') : id;
		const entry = this.get([guildID, memberID]);
		if (entry) return entry;

		const settings = new Settings(this, { id: `${guildID}.${memberID}`, ...data });
		if (this._synced) settings.sync();
		return settings;
	}

	/**
	 * Sync either all entries from the cache with the persistent database, or a single one.
	 * @since 0.0.1
	 * @param {(Array<string>|string)} [input=Array<string>] An object containing a id property, like discord.js objects, or a string
	 * @returns {?(MemberGateway|external:Settings)}
	 */
	async sync(input = this.client.guilds.reduce((keys, guild) => keys.concat(guild.members.map(member => member.settings.id)), [])) {
		if (Array.isArray(input)) {
			if (!this._synced) this._synced = true;
			const entries = await this.provider.getAll(this.type, input);
			for (const entry of entries) {
				if (!entry) continue;

				// Get the entry from the cache
				const cache = this.get(entry.id);
				if (!cache) continue;

				cache._existsInDB = true;
				cache._patch(entry);
			}

			// Set all the remaining settings from unknown status in DB to not exists.
			for (const guild of this.client.guilds.values()) {
				for (const member of guild.members.values()) if (member.settings._existsInDB !== true) member.settings._existsInDB = false;
			}
			return this;
		}

		const target = getIdentifier(input);
		if (!target) throw new TypeError('The selected target could not be resolved to a string.');

		const cache = this.get(target);
		return cache ? cache.sync() : null;
	}

}

module.exports = MemberGateway;
