const { GuildMemberStore } = require('discord.js');

/**
 * Adds our extensions to d.js's MemberStore
 * @extends external:GuildMemberStore
 */
class KlasaGuildMemberStore extends GuildMemberStore {

	/**
	 * Fetches member and syncs settings
	 * @param  {...any} args d.js args for MemberStore#fetch
	 */
	async fetch(...args) {
		const member = await super.fetch(...args);
		await member.settings.sync();
		return member;
	}

}

module.exports = KlasaGuildMemberStore;
