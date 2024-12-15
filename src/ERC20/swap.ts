import ABI from '../ABI/pancakeswap.json';
import { ethers } from 'ethers';
import { config } from '../config';

const provider = config.PROVIDER;
const contract = new ethers.Contract(config.PANCAKESWAP.ROUTER, ABI, provider);

// getTokenBalance
export const getTokenBalance = async (tokenAddress: string, wallet: string) => {
	try {
		const contract = new ethers.Contract(tokenAddress, ABI, provider);
		const balance = await contract.balanceOf(wallet);      

		return { success: true, data: balance };
	} catch (error) {
		console.log('Error getting balance:', error);

		return { success: false, data: error };
	}
};

// GetAmountsOut
export const getAmountsOut = async (amountIn: string, path: string[]) => {
	try {
		const amounts = await contract.getAmountsOut(amountIn, path);

		return { success: true, data: amounts };
	} catch (error) {
		console.log('Error getting amounts:', error);

		return { success: false, data: error };
	}
};

// Get walletNonce
export const getWalletNonce = async (wallet: string) => {
	try {
		const nonce = await provider.getTransactionCount(wallet);

		return { success: true, data: nonce };
	} catch (error) {
		console.log('Error getting nonce:', error);

		return { success: false, data: error };
	}
};

// SwapTokens
export const swapToken = async (
	amountIn: string,
	amountOutMin: string,
	path: string[],
	to: string,
	deadline: number,
	overloads: any
) => {
	try {
		const transaction =
			await contract.swapExactTokensForTokensSupportingFeeOnTransferTokens(
				amountIn,
				amountOutMin,
				path,
				to,
				deadline,
				overloads
			);
		await transaction.wait();

		return { success: true, data: transaction.hash };
	} catch (error) {
		console.log('Error swapping tokens:', error);

		return { success: false, data: error };
	}
};

// SwapETH

export const swapETHforToken = async (
	amountOutMin: string,
	amountIn: string,
	to: string,
	gasPrice: Number,
	gasLimit: Number,
	path: string[],
	nonce: Number
) => {
	try {
		const deadline = Math.floor(Date.now() / 1000) + 60 * 2; // 2 minutes
		const overloads = {
			gasPrice: gasPrice,
			gasLimit: gasLimit,
			nonce: nonce,
			value: amountIn,
		};
		const transaction =
			await contract.swapExactETHForTokensSupportingFeeOnTransferTokens(
				amountOutMin,
				path,
				to,
				deadline,
				overloads
			);
		await transaction.wait();

		return { success: true, data: transaction.hash };
	} catch (error) {
		console.log('Error swapping ETH:', error);

		return { success: false, data: error };
	}
};

// SwapTokenForETH

export const swapTokenForETH = async (
	amountIn: string,
	amountOutMin: string,
	path: string[],
	to: string,
	deadline: number,
	overloads: any
) => {
	try {
		const transaction =
			await contract.swapExactTokensForETHSupportingFeeOnTransferTokens(
				amountIn,
				amountOutMin,
				path,
				to,
				deadline,
				overloads
			);
		await transaction.wait();

		return { success: true, data: transaction.hash };
	} catch (error) {
		console.log('Error swapping tokens:', error);

		return { success: false, data: error };
	}
};
