const { Client, Schema, util: { mergeDefault } } = require('klasa');
const { CLIENT } = require('./util/constants');
const MemberGateway = require('./settings/MemberGateway');

Client.defaultMemberSchema = new Schema();

module.exports = class extends Client {

	constructor(options) {
		super(options);
		this.constructor[Client.plugin].call(this);
	}

	static [Client.plugin]() {
		mergeDefault(CLIENT, this.options);

		const { members } = this.options.gateways;
		members.schema = 'schema' in members ? members.schema : this.constructor.defaultMemberSchema;
		this.gateways.register(new MemberGateway(this, 'members', members));
	}

};
