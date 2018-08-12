const { Client, Schema } = require('klasa');
const MemberGateway = require('./settings/MemberGateway');

module.exports = class extends Client {

	constructor(options) {
		super(options);
		this.constructor[Client.plugin].call(this);
	}

	static [Client.plugin]() {
		const { members = {} } = this.options.gateways;
		const memberSchema = 'schema' in members ? members.schema : this.constructor.defaultMembersSchema;

		this.gateways.members = new MemberGateway(this.gateways, 'members', memberSchema, members.provider || this.options.providers.default);
		this.gateways.keys.add('members');
		this.gateways._queue.push(this.gateways.members.init.bind(this.gateways.members));
	}

};

Client.defaultMembersSchema = new Schema();
