declare module 'klasa-member-gateway' {

	import {
		GuildMember,
		Snowflake,
		Collection
	} from 'discord.js';
	import {
		Client,
		Schema,
		Settings,
		Gateway,
		GatewayDriver
	} from 'klasa';

	class MemberGatewayClient extends Client {
		public static defaultMemberSchema: Schema;
	}

	export { MemberGatewayClient as Client };

	export class MemberGateway extends Gateway {
		public readonly idLength: number;
		public acquire(target: unknown, id?: string): Settings;
		public get(id: string): Settings | null;
		public create(target: unknown, id?: string): Settings;
	}

}

declare module 'discord.js' {

	import { Schema, Settings } from 'klasa';

	export interface GuildMember {
		settings: Settings;
	}

	export namespace Client {
		export const defaultMemberSchema: Schema;
	}

}
