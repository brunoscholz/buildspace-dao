# Basic DAO

This project is the result of buildspace's [Build your own DAO with just Javascript in a weekend](https://buildspace.so/p/build-dao-with-javascript).

Built with third-web and react. Third-web saves a lot o time and allows you to create smart contracts by interacting with its sdk via javascript directly!!

## DAOs

DAOs are Decentralized Autonomous Organizations. They can be anything from a small community administration to large companies. There can be voting, roles, etc.

## NFT

You receive an NFT certificate for each buildspace project finished. Here is the one for the ENS project:

![](public/nft-dao.gif)

You can check it at [OpenSea](https://opensea.io/assets/matic/0x3CD266509D127d0Eac42f4474F57D0526804b44e/20073?force_update=true) as well.

## Live demo

Very rough and needs finishing touches, but its functionality is ok.

[Condo Admin DAO](https://condo-dao.vercel.app/)

## Development

You must have the [Metamask extension](https://metamask.io/download/) on your browser.

```
$ git clone https://github.com/brunoscholz/buildspace-dao.git
```

Create a .env file and place the following variables:

```
PRIVATE_KEY=...
ALCHEMY_API_URL=...
WALLET_ADDRESS=...
```

PRIVATE_KEY is the private key to the account you are testing with. You can get this on metamask account details -> expose private key. This will be used by third-web to deploy the contract for the DAO.

ALCHEMY_API_URL is https url of your app. You can create one [here](https://www.alchemy.com/).

WALLET_ADDRESS is pretty self explanatory. Copy from metamask.

* I built it with node 16.13.0

```
$ npm install
```

Run the scripts inside the scripts folder.

```
$ node scripts/1-initialize-sdk.js
$ node scripts/2-deploy-drop.js
$ node scripts/3-config-nft.js
$ node scripts/4-set-claim-condition.js
$ node scripts/5-deploy-token.js
$ node scripts/6-print-money.js
$ node scripts/7-airdrop-token.js
$ node scripts/8-deploy-vote.js
$ node scripts/9-setup-vote.js
$ node scripts/10-create-vote-proposals.js
$ node scripts/11-revoke-roles.js
$ node scripts/12-grant-mint-to-vote.js
```

```
$ npm run start
```

Go to [localhost:3000](http://localhost:3000)
