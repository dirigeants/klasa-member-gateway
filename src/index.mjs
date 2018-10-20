import { Client as KlasaClient } from 'klasa';

const pluginSymbol = KlasaClient.plugin;

// KlasaMember
export { default as KlasaMember } from './lib/extensions/KlasaMember';

// MemberGateway
export { default as MemberGateway } from './lib/settings/MemberGateway';

// MemberGatewayClient
import Client from './lib/Client';
export { Client };
export const { [pluginSymbol] } = Client;
