import fs from 'fs';
import sharp from 'sharp';
import path from 'path';

const dir = './static';
const PNG = '.png';

if (!fs.existsSync(dir)) {
	console.error('No source dir exists!');
	process.exit(1);
}

async function convert(dir) {
	const entries = await fs.promises.readdir(dir, { withFileTypes: true });

	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);

		if (entry.isDirectory()) {
			await convert(fullPath);
		} else if (entry.isFile() && path.extname(entry.name).toLowerCase() === PNG) {
			const outputPath = fullPath.replace('.png', '.webp');
			try {
				await sharp(fullPath).webp().toFile(outputPath);

				console.log(`[ok] ${outputPath}`);
			} catch (err) {
				console.error(`Error converting ${fullPath}:`, err);
			}
		}
	}
}

convert(dir).catch((err) => {
	console.error(`Unexpected error: ${err.message}`);
	process.exit(1);
});
