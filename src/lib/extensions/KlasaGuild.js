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

			// Members are already cached in the super call, so we need to repopulate with our extended store
			const { members } = this;

			/**
			 * Storage for KlasaMembers
			 * @since 0.0.1
			 * @type {KlasaGuildMemberStore}
			 */
			this.members = new KlasaGuildMemberStore(this);

			for (const [id, member] of members) this.members.set(id, member);
		}

	}

	return KlasaGuild;
});
