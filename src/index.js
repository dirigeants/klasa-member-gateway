const { Client: { plugin } } = require('klasa');

module.exports = {
	KlasaMember: require('./lib/extensions/KlasaMember'),
	MemberGateway: require('./lib/settings/MemberGateway'),
	Client: require('./lib/Client'),
	[plugin]: require('./lib/Client')[plugin]
};
