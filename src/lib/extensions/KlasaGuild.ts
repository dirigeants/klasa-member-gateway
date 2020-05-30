import { Client, extender, Constructor, Guild } from '@klasa/core';
import { KlasaGuildMemberStore } from './KlasaGuildMemberStore';
import type { APIGuildData } from '@klasa/dapi-types';

extender.extend('Guild', CoreGuild => class KlasaGuild extends CoreGuild {

	public constructor(client: Client, data: APIGuildData, shardID: number) {
		super(client, data, shardID);

		/**
		 * Storage for KlasaMembers
		 * @since 0.0.1
		 */
		Reflect.set(this, 'members', new KlasaGuildMemberStore(this.client, this));
	}

} as Constructor<Guild>);
