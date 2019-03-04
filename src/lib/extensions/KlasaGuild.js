const { Structures } = require('discord.js');
const KlasaGuildMemberStore = require('./KlasaGuildMemberStore');

Structures.extend('guild', Guild => {
	/**
     * Mutates KlasaGuild to include a KlasaMemberStore with our extensions
	 * @extends external:Guild
     */
	class KlasaGuild extends Guild {

		constructor(...args) {
			super(...args);

			/**
			 * Storage for KlasaMembers
			 * @since 0.0.1
			 * @type {KlasaGuildMemberStore}
			 */
			this.members = new KlasaGuildMemberStore();
		}

	}

	return KlasaGuild;
});
