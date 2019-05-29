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
		GatewayStorage,
		GatewayDriver
	} from 'klasa';

	class MemberGatewayClient extends Client {
		public static defaultMemberSchema: Schema;
	}

	export { MemberGatewayClient as Client };

	export class MemberGateway extends GatewayStorage {
		public store: GatewayDriver;
		public syncQueue: Collection<string, Promise<Settings>>;
		public readonly Settings: Settings;
		public readonly idLength: number;
		private _synced: boolean;

		public get(id: string | [Snowflake, Snowflake]): Settings | null;
		public create(id: string | [Snowflake, Snowflake], data?: Object): Settings;
		public sync(input: string): Promise<Settings>;
		public sync(input?: string[]): Promise<this>;
	}

}

declare module 'discord.js' {

	import { Settings } from 'klasa';

	export interface GuildMember {
		settings: Settings;
	}

}
