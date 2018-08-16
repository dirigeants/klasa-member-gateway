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
		mergeDefault(this.options, CLIENT);
		const { members } = this.options.gateways;
		const memberSchema = 'schema' in members ? members.schema : this.constructor.defaultMemberSchema;

		this.gateways.members = new MemberGateway(this.gateways, 'members', memberSchema, members.provider || this.options.providers.default);
		this.gateways.keys.add('members');
		this.gateways._queue.push(this.gateways.members.init.bind(this.gateways.members));
	}

};
