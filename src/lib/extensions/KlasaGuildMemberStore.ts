import { GuildMemberStore } from '@klasa/core';

/**
 * Adds our extensions to klasa's GuildMemberStore.
 */
export class KlasaGuildMemberStore extends GuildMemberStore {

	// async _fetchSingle(...args) {
	// 	const member = await super._fetchSingle(...args);
	// 	await member.settings.sync();
	// 	return member;
	// }

	// async _fetchMany(...args) {
	// 	const members = await super._fetchMany(...args);
	// 	await Promise.all(members.map(member => member.settings.sync()));
	// 	return members;
	// }

}
