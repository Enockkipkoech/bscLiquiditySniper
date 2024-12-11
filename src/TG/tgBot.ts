import { Context, Telegraf } from 'telegraf';
import { config } from '../config';
import fs from 'fs';
import path from 'path';

if (!config.TG.botToken) {
	console.log(`Provide LiquiditySnipperBot BOT Token in .env file!`);
}

console.log(`*****`.repeat(5));
console.log(
	`TG BscLiquiditySniper Bot Notifications Started at: ${new Date().toLocaleTimeString()}`
);

const bot = new Telegraf(config.TG.botToken!);
bot.use(async (ctx: Context, next) => {
	try {
		let userId = ctx.message?.from?.id || '';
		console.log(`User ID:`, userId);
		if (config.TG.users!.includes(userId.toString())) {
			await next();
			return;
		} else {
			return ctx.reply(
				`You are not allowed to use this bot! Contact the Dev @https://t.me/The_Bug_Around`
			);
		}
	} catch (error) {
		console.log(`Error in Telegram Bot user Auth:`, error);
	}
});

export const tgMessage = async (message: string, photoBuffer?: Buffer) => {
	try {
		const randomIndex = Math.floor(Math.random() * 3) + 1;
		console.log('Random Index:', randomIndex);

		const randomImage = bufferImage(`../images/img${randomIndex}.png`);

		for (const user of config.TG.users!.split(',')) {
			const frtedMsg = normalizeMessage(message);
			let photo = photoBuffer ? photoBuffer : randomImage;

			const msg = await bot.telegram
				.sendPhoto(
					user,
					{ source: photo! },
					{
						caption: frtedMsg,
						parse_mode: 'MarkdownV2',
					}
				)
				.then(() => {
					console.log('Message sent to:', user);
					return 'Message sent successfully';
				})

				.catch((error: any) => {
					// ERROR HANDLING
					console.log('Error sending message to:', user, error);
					const errorCode = error.response?.error_code;
					const errorDescription = error.response?.description;

					if (
						errorCode === 400 &&
						errorDescription === 'Bad Request: chat not found'
					) {
						console.error(
							`ChatId ${user} not found. User has not started the bot yet`
						);
						return 'ChatId not found';
					} else if (
						errorCode === 400 &&
						errorDescription.includes("can't parse entities")
					) {
						console.error(`Message contains invalid entities. ChatId: ${user}`);
						return 'Message contains invalid entities';
					} else {
						console.error(
							`Error sending message to User:`,
							user,
							error.message || errorDescription
						);
						return 'Error sending message to User';
					}
				});
			return msg;
		}
		return null;
	} catch (error) {
		console.log('Error sending message with photo', error);
		return error;
	}
};

const normalizeMessage = (message: string) => {
	return message
		.replaceAll('_', '\\_')
		.replaceAll('|', '\\|')
		.replaceAll('.', '\\.')
		.replaceAll('{', '\\{')
		.replaceAll('}', '\\}')
		.replaceAll('=', '\\=')
		.replaceAll('+', '\\+')
		.replaceAll('>', '\\>')
		.replaceAll('<', '\\<')
		.replaceAll('-', '\\-')
		.replaceAll('/', '\\/')
		.replaceAll('!', '\\!')
		.replaceAll('[', '\\[')
		.replaceAll(']', '\\]')
		.replaceAll('`', '\\`')
		.replaceAll('~', '\\~')
		.replaceAll('#', '\\#');
};

// LOAD Image to Buffer

const bufferImage = (imagePath: string) => {
	try {
		const image = fs.readFileSync(path.resolve(__dirname, imagePath));
		console.log('Image loaded to buffer:', image);
		return image;
	} catch (error) {
		console.log('Error loading image:', error);
		return null;
	}
};
