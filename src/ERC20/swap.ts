import ABI from '../ABI/pancakeswap.json';
import { ethers } from 'ethers';
import { config } from '../config';

const provider = config.PROVIDER;

const signer = new ethers.Wallet(config.WALLET.secretKey!);
const account = signer.connect(provider);
const contract = new ethers.Contract(config.PANCAKESWAP.ROUTER, ABI, account);

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
	const amountsOutABI = [
		'function getAmountsOut(uint amountIn, address[] memory path) public view  returns (uint[] memory amounts)',
	];
	const contract = new ethers.Contract(
		config.PANCAKESWAP.ROUTER,
		amountsOutABI,
		provider
	);
	try {
		const amounts = await contract.getAmountsOut(amountIn, path);
		console.log('AMOUNTS:', amounts);

		return amounts;
	} catch (error: any) {
		console.log('Error getting amounts:', error);

		return null;
	}
};

// Get walletNonce
export const getWalletNonce = async (wallet: string) => {
	try {
		const nonce = await provider.getTransactionCount(wallet);

		return { success: true, data: nonce };
	} catch (error) {
		console.log('Error getting nonce:', error);

		return { success: false, data: 0 };
	}
};

// Get Allowance for token
export const getAllowance = async (token: string): Promise<string> => {
	try {
		const contract = new ethers.Contract(token, ABI, account);
		const allowance = await contract.allowance(
			account,
			config.PANCAKESWAP.ROUTER
		);
		const decimals = await contract.decimals();
		return ethers.formatUnits(allowance, decimals);
	} catch (error) {
		return '0';
	}
};

// Approve Allowance
const approveABI = [
	'function approve(address _spender, uint256 _value) public returns (bool success)',
];
const MAX_INT =
	'115792089237316195423570985008687907853269984665640564039457584007913129639935';
export const approveAllowance = async (token: string) => {
	try {
		const overloads = {
			gasPrice: 2000000000,
			gasLimit: 300000,
		};
		console.log('APPROVING ALLOWANCE');
		const contract = new ethers.Contract(token, approveABI, account);
		let approveTx = await contract.approve(
			config.PANCAKESWAP.ROUTER,
			MAX_INT,
			overloads
		);
		// await approveTx.wait();
		return { success: true, data: approveTx };
	} catch (error) {
		console.log('Error approving allowance:', error);
	}
};

// SwapTokens
export const swapToken = async (
	amountIn: string,
	amountOutMin: string,
	path: string[],
	to: string,
	deadline: number,
	overloads?: any
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
		// await transaction.wait();

		return { success: true, data: transaction };
	} catch (error) {
		console.log('Error swapping tokens:', error);

		return { success: false, data: error };
	}
};

// SwapETH

export const swapETHforToken = async (
	amountOutMin: string,
	path: string[],
	to: string,
	amountIn: string,
	overloads?: any
) => {
	try {
		const deadline = Math.floor(Date.now() / 1000) + 60 * 2; // 2 minutes
		const _overloads = {
			...overloads,
			value: amountIn,
		};
		const transaction =
			await contract.swapExactETHForTokensSupportingFeeOnTransferTokens(
				amountOutMin,
				path,
				to,
				deadline,
				_overloads
			);
		// await transaction.wait();

		return { success: true, data: transaction };
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
	overloads?: any
) => {
	console.log(
		`SWAPPING TOKEN FOR ETH: ${amountIn}, ${amountOutMin}, ${path}, ${to}, ${deadline}, ${overloads}`
	);
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

		return { success: true, data: transaction };
	} catch (error) {
		console.log('Error swapping tokens:', error);

		return { success: false, data: error };
	}
};
