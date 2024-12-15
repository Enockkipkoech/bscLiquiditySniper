import { config } from '../config';
import {
	swapToken,
	swapETHforToken,
	swapTokenForETH,
	getAmountsOut,
	getWalletNonce,
	getTokenBalance,
} from '../ERC20';

export const swapTokens = async (
	tokenIn: string,
	tokenOut: string,
	amountIn: string,
	toAddress: string
) => {
	const amountOutMin = '0';

	// Check if tokenIn is ETH
	if (tokenIn === 'BNB') {
		let path = [`${config.PANCAKESWAP.WBNB_ADDRESS}`, tokenOut];
		const amountsOut = await getAmountsOut(amountIn, path);

		if (!amountsOut.success) {
			console.log('Error getting amounts:', amountsOut.data);
			return { success: false, data: amountsOut.data };
		}
		let _amountIn = amountsOut.data[0];

		const tokenBalance = await getTokenBalance(tokenIn, toAddress);

		const walletNonce = await getWalletNonce(toAddress);

		console.log({ walletNonce, tokenBalance, amountsOut });

		if (!walletNonce.success) {
			console.log('Error getting nonce:', walletNonce.data);
			return { success: false, data: walletNonce.data };
		}
		const overloads = {
			gasPrice: 2000000,
			gasLimit: 5000000,
			nonce: walletNonce.data ? Number(walletNonce.data) : 0,
		};

		const swap = await swapETHforToken(
			amountOutMin,
			_amountIn,
			toAddress,
			overloads.gasPrice,
			overloads.gasLimit,
			path,
			overloads.nonce
		);

		if (!swap.success) {
			console.log('Error swapping tokens:', swap.data);
			return { success: false, data: swap.data };
		}

		return { success: true, data: swap.data };
	} else if (tokenOut === 'BNB') {
		let path = [tokenIn, `${config.PANCAKESWAP.WBNB_ADDRESS}`];
		const amountsOut = await getAmountsOut(amountIn, path);
		const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
		const _amountIn = amountsOut.data[0];

		if (!amountsOut.success) {
			console.log('Error getting amounts:', amountsOut.data);
			return { success: false, data: amountsOut.data };
		}

		const tokenBalance = await getTokenBalance(tokenIn, toAddress);

		const walletNonce = await getWalletNonce(toAddress);
		console.log({ walletNonce, tokenBalance, amountsOut });

		if (!walletNonce.success) {
			console.log('Error getting nonce:', walletNonce.data);
			return { success: false, data: walletNonce.data };
		}
		const overloads = {
			gasPrice: 2000000,
			gasLimit: 5000000,
		};

		const swap = await swapTokenForETH(
			_amountIn,
			amountOutMin,
			path,
			toAddress,
			deadline,
			overloads
		);

		if (!swap.success) {
			console.log('Error swapping tokens:', swap.data);
			return { success: false, data: swap.data };
		}

		return { success: true, data: swap.data };
	} else {
		let path = [tokenIn, tokenOut];
		const amountsOut = await getAmountsOut(amountIn, path);
		const deadline = Math.floor(Date.now() / 1000) + 60 * 20;

		console.log({ amountsOut, deadline });

		if (!amountsOut.success) {
			console.log('Error getting amounts:', amountsOut.data);
			return { success: false, data: amountsOut.data };
		}
		let _amountIn = amountsOut.data[0];

		const tokenBalance = await getTokenBalance(tokenIn, toAddress);

		const walletNonce = await getWalletNonce(toAddress);

		console.log({ walletNonce, tokenBalance, amountsOut, _amountIn });

		if (!walletNonce.success) {
			console.log('Error getting nonce:', walletNonce.data);
			return { success: false, data: walletNonce.data };
		}
		const overloads = {
			gasPrice: 2000000,
			gasLimit: 5000000,
		};

		const swap = await swapToken(
			_amountIn,
			amountOutMin,
			path,
			toAddress,
			deadline,
			overloads
		);

		if (!swap.success) {
			console.log('Error swapping tokens:', swap.data);
			return { success: false, data: swap.data };
		}

		return { success: true, data: swap.data };
	}
};
