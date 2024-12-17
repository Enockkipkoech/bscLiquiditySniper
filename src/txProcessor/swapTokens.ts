import {
	swapToken,
	swapETHforToken,
	swapTokenForETH,
	getAmountsOut,
	getWalletNonce,
	getTokenBalance,
	getAllowance,
	approveAllowance,
} from '../ERC20';
import { supportedTokens } from '../ERC20/supportedTokens';

export const swapTokens = async (
	tokenIn: string,
	tokenOut: string,
	amountIn: string,
	toAddress: string
) => {
	const SupportedTokens = supportedTokens();

	// Validate that tokenIn and tokenOut are supported
	let tokenInAddress = '';
	let tokenOutAddress = '';
	const isTokenInSupported = SupportedTokens.find(
		(token) => token.symbol === tokenIn
	);
	const isTokenOutSupported = SupportedTokens.find(
		(token) => token.symbol === tokenOut
	);
	console.log({ isTokenInSupported, isTokenOutSupported });

	tokenInAddress = isTokenInSupported ? isTokenInSupported.address : '';
	tokenOutAddress = isTokenOutSupported ? isTokenOutSupported.address : '';

	if (!tokenInAddress || !tokenOutAddress) {
		console.log(
			`Error: One or both tokens are not supported. tokenIn: ${tokenIn}, tokenOut: ${tokenOut}`
		);
		return {
			success: false,
			data: `Unsupported token(s). Supported tokens are: ${SupportedTokens.map(
				(token) => token.symbol
			).join(', ')}`,
		};
	}
	// Check if tokenIn is ETH
	if (tokenIn === 'BNB') {
		let path = [tokenInAddress, tokenOutAddress];
		const amountsOut = await getAmountsOut(amountIn, path);

		if (!amountsOut) {
			console.log('Error getting amounts:', amountsOut);
			return { success: false, data: amountsOut };
		}
		const amountOutMin = amountsOut[1];
		let _amountIn = parseInt(amountsOut[0]);

		console.log({ _amountIn, amountOutMin });

		const tokenBalance = await getTokenBalance(tokenInAddress, toAddress);

		const walletNonce = await getWalletNonce(toAddress);
		const allowance = await getAllowance(tokenInAddress);

		console.log({ walletNonce, allowance, tokenBalance, amountsOut });

		if (!walletNonce.success || !allowance) {
			console.log(
				'Error getting Nonce || Allowance',
				walletNonce.data,
				allowance
			);
			return { success: false, data: walletNonce.data, allowance };
		}
		const overloads = {
			gasPrice: 2000000000,
			gasLimit: 3000000,
			nonce: walletNonce.data ? Number(walletNonce.data) : 0,
		};

		const swap = await swapETHforToken(
			amountOutMin,
			path,
			toAddress,
			amountsOut[0]
		);
		console.log({ swap });

		if (!swap.success) {
			console.log('Error swapping tokens:', swap.data);
			return { success: false, data: swap.data };
		}

		return { success: true, data: swap.data };
	} else if (tokenOut === 'BNB') {
		let path = [tokenInAddress, tokenOutAddress];
		const amountsOut = await getAmountsOut(amountIn, path);
		const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
		const _amountIn = amountsOut[0];
		const amountOutMin = amountsOut[1];

		if (!amountsOut) {
			console.log('Error getting amounts:', amountsOut);
			return { success: false, data: amountsOut };
		}

		const tokenBalance = await getTokenBalance(tokenInAddress, toAddress);

		const walletNonce = await getWalletNonce(toAddress);

		const overloads = {
			gasPrice: 3000000000,
			gasLimit: 30000000,
			nonce: walletNonce.data ? Number(walletNonce.data) + 1 : 1,
		};
		console.log({ tokenBalance, amountsOut, overloads });

		const swap = await swapTokenForETH(
			_amountIn,
			amountOutMin,
			path,
			toAddress,
			deadline,
			overloads
		);
		console.log({ swap });

		if (!swap.success) {
			console.log('Error swapping tokens:', swap.data);
			return { success: false, data: swap.data };
		}

		return { success: true, data: swap.data };
	} else {
		let path = [tokenInAddress, tokenOutAddress];
		console.log({ path });
		const amountsOut = await getAmountsOut(amountIn, path);

		if (!amountsOut) {
			console.log('Error: Insufficient Amounts Input', amountsOut);
			return { success: false, data: amountsOut };
		}

		const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
		let _amountOutMin = amountsOut[1].toString();
		let _amountIn = parseInt(amountsOut[0]);

		console.log({ _amountIn, _amountOutMin, tokenInAddress, tokenOutAddress });

		// Get Allowance
		const allowance = await getAllowance(tokenInAddress);
		console.log({ allowance });

		if (allowance < amountIn) {
			const approve = await approveAllowance(tokenInAddress);

			if (!approve!.success) {
				console.log('Error approving allowance:', approve!.data);
				return { success: false, data: approve!.data };
			}
		}

		const tokenBalance = await getTokenBalance(tokenInAddress, toAddress);
		const walletNonce = await getWalletNonce(toAddress);

		console.log({
			walletNonce,
			tokenBalance,
			amountsOut,
			_amountIn,
			allowance,
		});

		const overloads = {
			gasPrice: 1000000000,
			gasLimit: 200000,
		};

		const swap = await swapToken(
			amountsOut[0],
			_amountOutMin,
			path,
			toAddress,
			deadline,
			overloads
		);

		console.log({ swap });

		if (!swap.success) {
			console.log('Error swapping tokens:', swap.data);
			return { success: false, data: swap.data };
		}

		return { success: true, data: swap.data };
	}
};
