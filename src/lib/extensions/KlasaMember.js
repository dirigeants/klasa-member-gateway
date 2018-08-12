const { Structures } = require('discord.js');

module.exports = Structures.extend('GuildMember', GuildMember => {
	/**
	 * Klasa's Extended GuildMember
	 * @extends external:GuildMember
	 */
	class KlasaMember extends GuildMember {

		/**
		 * @typedef {external:GuildMemberJSON} KlasaMemberJSON
		 * @property {SettingsJSON} settings The per member settings
		 */

		/**
		 * @param {...*} args Normal D.JS GuildMember args
		 */
		constructor(...args) {
			super(...args);

			/**
			 * The member level settings for this context (member || default)
			 * @since 0.5.0
			 * @type {Settings}
			 */
			this.settings = this.client.gateways.members.create([this.guild.id, this.id]);
		}

		/**
		 * Returns the JSON-compatible object of this instance.
		 * @since 0.5.0
		 * @returns {KlasaMemberJSON}
		 */
		toJSON() {
			return { ...super.toJSON(), settings: this.settings };
		}

	}

	return KlasaMember;
});
