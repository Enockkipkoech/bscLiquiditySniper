import { ethers } from 'ethers';

const mainnetRPCs = [
	'https://bsc-dataseed.bnbchain.org',
	'https://bsc-dataseed.nariox.org',
	'https://bsc-dataseed.defibit.io',
	'https://bsc-dataseed.ninicoin.io',
	'https://bsc.nodereal.io',
	'https://bsc-dataseed-public.bnbchain.org',
	'https://bnb.rpc.subquery.network/public',
];

const testnetRPCs = [
	'https://eth-mainnet.g.alchemy.com/v2/C2XvP6n2YBz7EuFyTWqOZicmokGHVMYC',
	'https://bsc-testnet-dataseed.bnbchain.org',
	'https://bsc-testnet.bnbchain.org',
	'https://bsc-prebsc-dataseed.bnbchain.org',
];

export class RPCManager {
	private readonly mainnetRPCs: string[];
	private readonly testnetRPCs: string[];

	constructor() {
		this.mainnetRPCs = mainnetRPCs;
		this.testnetRPCs = testnetRPCs;
	}

	private _provider: ethers.JsonRpcProvider | null | undefined;

	get provider() {
		if (!this._provider) throw new Error('Provider not set');
		return this._provider;
	}

	private async check(url: string): Promise<boolean> {
		try {
			const response = new ethers.JsonRpcProvider(url);
			if (!response) return false;
			return true;
		} catch (error: any) {
			console.error('Error checking RPC:', error?.message);
			return false;
		}
	}

	public async get(
		isTestnet: boolean,
		maxRetries: number = 3
	): Promise<string | null> {
		const rpcs = isTestnet ? this.testnetRPCs : this.mainnetRPCs;

		for (let i = 0; i < maxRetries; i++) {
			const randomIndex = Math.floor(Math.random() * rpcs.length);
			const rpcUrl = rpcs[randomIndex];

			if (await this.check(rpcUrl)) {
				this._provider = new ethers.JsonRpcProvider(rpcUrl);
				// console.log("Provider:",this._provider)
				return rpcUrl;
			}
			await new Promise((resolve) => setTimeout(resolve, 1000));
		}

		console.log('Could not connect to any RPC');

		return null;
	}

	public async walletWithProvider(
		wallet: ethers.HDNodeWallet
	): Promise<{ address?: string; privatekey?: string } | null> {
		try {
			return { address: wallet.address, privatekey: wallet.privateKey };
		} catch (error) {
			console.error('Error getting wallet with provider: -> ', error);
			return { address: undefined, privatekey: undefined };
		}
	}
}



export default RPCManager;
