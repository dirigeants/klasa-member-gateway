import { Plugin, Client } from '@klasa/core';
import { mergeDefault } from '@klasa/utils';
import { CLIENT } from './util/constants';
import { Schema } from 'klasa';
import { MemberGateway } from './settings/MemberGateway';

export class PluginClient extends Client implements Plugin {

	public static [Client.plugin](this: Client): void {
		mergeDefault(CLIENT, this.options);

		const { members } = this.options.gateways;
		members.schema = 'schema' in members ? members.schema : (this.constructor as typeof PluginClient).defaultMemberSchema;
		this.gateways.register(new MemberGateway(this, 'members', members));
	}

	public static defaultMemberSchema = new Schema();

}
