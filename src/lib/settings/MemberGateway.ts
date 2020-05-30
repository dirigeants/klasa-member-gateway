import { Gateway, Settings } from 'klasa';
import { GuildMember } from '@klasa/core';

/**
 * The Gateway class that manages the data input, parsing, and output, of an entire database, while keeping a cache system sync with the changes.
 * @extends GatewayStorage
 */
export class MemberGateway extends Gateway {

	/**
	 * The ID length for all entries.
	 * @since 0.0.1
	 * @type {number}
	 * @readonly
	 * @private
	 */
	public get idLength(): number {
		// 18 + 1 + 18: `{MEMBERID}.{GUILDID}`
		return 37;
	}

	/**
	 * Gets an entry from the cache or creates one if it does not exist
	 * @since 0.5.0
	 * @param target The target that holds a Settings instance of the holder for the new one
	 * @param id The settings' identificator
	 */
	public acquire(target: GuildMember, id = `${target.guild.id}.${target.id}`): Settings {
		return super.acquire(target, id);
	}

	/**
	 * Get a Settings entry from this gateway
	 * @since 0.0.1
	 * @param {string} id The id for the instance to retrieve
	 */
	public get(id: string): Settings | null {
		const [guildID, memberID] = id.split('.');
		const guild = this.client.guilds.get(guildID);
		if (guild) {
			const member = guild.members.get(memberID);
			return member?.settings ?? null;
		}

		return null;
	}

	/**
	 * Create a new Settings for this gateway
	 * @since 0.0.1
	 * @param target The holder for this Settings instance
	 * @param id The id for this instance
	 */
	public create(target: GuildMember, id = `${target.guild.id}.${target.id}`): Settings {
		return super.create(target, id);
	}

}
