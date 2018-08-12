declare module 'klasa-member-gateway' {

	import {
		GuildMember,
		Snowflake,
		Collection
	} from 'discord.js';
	import {
		Schema,
		Settings,
		GatewayStorage,
		GatewayDriver,
		GuildResolvable,
		GatewayGetPathOptions,
		GatewayGetPathResult
	} from 'klasa';

	class MemberGatewayClient extends Client {
		public static defaultMembersSchema: Schema;
	}

	export { MemberGatewayClient as Client };

	export class KlasaMember extends GuildMember {
		public settings: Settings;
		public toJSON(): KlasaMemberJSON;
	}

	export class MemberGateway extends GatewayStorage {
		public store: GatewayDriver;
		public syncQueue: Collection<string, Promise<Settings>>;
		public readonly Settings: Settings;
		private _synced: boolean;

		public get(id: string | [Snowflake, Snowflake]): Settings | null;
		public create(id: string | [Snowflake, Snowflake], data?: Object): Settings;
		public sync(input: string): Promise<Settings>;
		public sync(input?: string[]): Promise<this>;
		public getPath(key?: string, options?: GatewayGetPathOptions): GatewayGetPathResult | null;
		public toJSON(): GatewayJSON;
		public toString(): string;

		private _resolveGuild(guild: GuildResolvable): KlasaGuild;
	}

	export type KlasaMemberJSON = {
		guildID: Snowflake;
		userID: Snowflake;
		joinedTimestamp: number;
		lastMessageChannelID?: Snowflake;
		deleted: boolean;
		nickname?: string;
		displayName: string;
		roles: Array<Snowflake>;
		settings: Settings;
	};
}
