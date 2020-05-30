import { Constructor, GuildMember, extender } from '@klasa/core';
import type { Settings } from 'klasa';

module.exports = extender.extend('GuildMember', CoreGuildMember => class KlasaMember extends CoreGuildMember {

	public settings: Settings;

	/**
	 * @param args The guild member arguments.
	 * @since 0.0.1
	 */
	public constructor(...args: readonly unknown[]) {
		super(...args);

		/**
		 * The member level settings for this context (member || default)
		 * @since 0.0.1
		 */
		this.settings = this.client.gateways.get('members').acquire(this, `${this.guild.id}.${this.id}`);
	}

	/**
	 * Returns the JSON-compatible object of this instance.
	 * @since 0.0.1
	 */
	public toJSON(): Record<PropertyKey, unknown> {
		return { ...super.toJSON(), settings: this.settings.toJSON() };
	}

} as Constructor<GuildMember>);
