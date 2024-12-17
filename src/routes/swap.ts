import { Request, Response, Router } from 'express';
import { swapTokens } from '../txProcessor';

const router = Router();

router.get('/swap', async (req: Request, res: Response) => {
	res.status(200).json({ success: true, message: 'Swap route', data: '' });
});

router.post('/swaps', async (req: Request, res: Response) => {
	const { tokenIn, tokenOut, amountIn, toAddress } = req.body;
	console.log({ tokenIn, tokenOut, amountIn, toAddress });
	// Call swapTokens function
	const swap = await swapTokens(tokenIn, tokenOut, amountIn, toAddress);
	// Return response
	// console.log(swap);
	res.status(200).json({ success: true, message: 'Swap route', data: swap });
});

export { router as swapRouter };
