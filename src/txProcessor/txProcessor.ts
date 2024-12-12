import { TxContents } from '../utils/interfaces';
import ABI from '../ABI/pancakeswap.json';
import { ethers } from 'ethers';
import { config } from '../config';
import { tgMessage } from '../TG';

const methodsExcluded = ['0x0', '0x']; // Transfers

export const txProcessor = async (tx: TxContents) => {
	if (methodsExcluded.includes(tx.data)) {
		console.log('Excluded method:', tx.data);
		return;
	}
	// Process the transaction
	console.log('Processing transaction:', tx);

	// Decode the transaction data
	const IABI = new ethers.Interface(ABI);
	const router = config.PANCAKESWAP.ROUTER;

	if (router === tx.to?.toLocaleLowerCase()) {
		const decodedData = IABI.parseTransaction({ data: tx.data });
		console.log('Decoded data:', decodedData);

		try {
			await tgMessage(
				`Transaction: ${tx.hash}\nFrom: ${tx.from}\nTo: ${tx.to}\nValue: ${
					tx.value
				}\nGas Price: ${tx.gasPrice}\nGas Limit: ${tx.gasLimit}\nNonce: ${
					tx.nonce
				}\nData: ${tx.data}\nChainId: ${
					tx.chainId
				}\nDecoded Data: ${JSON.stringify(decodedData)}`
			);
		} catch (error) {
			console.log('TG Error sending Decoded Data:', error, tx);
		}
	}
};
