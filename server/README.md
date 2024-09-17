# Vouch-Gitcoin-Passport Server

This server is a simple service that provides the ability to verify the wallets AO balance and then vouch for approved wallet addresses.

## Deployment

The deployment is setup for continuous deployment so if you make any updates or changes they will automatically publish.

## Environment

The .env file contains some settings to be configured for the service to work properly.

| Name | Description |
| --- | --- |
| WALLET | Path to the wallet.json file |
| VOUCHER_ADDRESS | Address of the voucher wallet |
| VOUCH_CONTRACT | Contract associated with the vouch dao |
| VOUCH_DAO_PROCESS_ID | Process id for the vouch dao |

## DevSetup

```sh
yarn
```