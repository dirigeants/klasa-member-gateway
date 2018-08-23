# klasa-member-gateway

Simple plugin to manage an efficient per-member settings gateway.

## Installation

```
NPM
npm install --save dirigeants/klasa-member-gateway

Yarn
yarn add https://github.com/dirigeants/klasa-member-gateway.git
```

## Setup

```js
const { Client } = require('klasa');

Client.use(require('klasa-member-gateway'));

// Modifying the Schema
Client.defaultMemberSchema
    .add('experience', 'integer', { default: 0 })
    .add('level', 'integer', { default: 0 });
```
