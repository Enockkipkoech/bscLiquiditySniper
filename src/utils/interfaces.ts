import { BigNumberish } from 'ethers';
export interface TxContents {
	hash: string;
	from: string;
	to: string | undefined;
	maxPriorityFeePerGas?: BigNumberish;
	maxFeePerGas?: BigNumberish;
	gasPrice?: BigNumberish;
	gasLimit?: BigNumberish;
	value: BigNumberish;
	nonce: number;
	data: string;
	chainId: bigint;
}

export interface Overloads {
	gasLimit?: number;
	nonce?: number;
	gasPrice?: number;
	maxPriorityFeePerGas?: number;
	maxFeePerGas?: number;
	value?: number;
	currentNonce?: number;
}

export interface Token {
	symbol: string;
	address: string;
	decimals: number;
	balance: string;
	amountInUsd: string;
	info: any;
}
