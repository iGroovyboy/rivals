import { type APICounterpickData, type APIHeroData, filterableClasses } from '$lib/index';

export const deepCloneObject = (obj: unknown) => {
	return JSON.parse(JSON.stringify(obj));
};

export const filterHeroesByClass = (data: APIHeroData[], classname: string): APIHeroData[] => {
	if (filterableClasses.includes(classname)) {
		return data.filter((h) => {
			return h.class.toLowerCase() === classname;
		});
	}

	return data;
};

export const getHeroByName = (data: APIHeroData[], name: string) =>
	data?.find((h) => h.name === name);

export const getCounterpicksByHeroId = (
	hero_id: number,
	heroes: APIHeroData[],
	counterpicks: APICounterpickData[]
): APIHeroData[] => {
	const heroCounterpicks = counterpicks.filter((c) => c.hero_id === hero_id);
	if (!heroCounterpicks.length) {
		return [];
	}

	const data: APIHeroData[] = [];
	heroCounterpicks.forEach((cp) => {
		const h = heroes.find((hero) => hero.id === cp.counter_hero_id);
		data.push(h);
	});

	return data;
};

type UrlData = Record<'host' | 'paths' | 'params', string | string[] | Record<string, string>>;
export const parseUrl = (url: string): UrlData => {
	const urlObj = new URL(url);

	const host = urlObj.host;

	const paths = urlObj.pathname.split('/').filter((path) => path);

	const params = {};
	urlObj.searchParams.forEach((value, key) => {
		params[key] = value;
	});

	return { host, paths, params };
};

export const lightenColor = (color = '#cdcdcd', percent = 60): string => {
	if (color.startsWith('#')) {
		color = color.slice(1);
	}

	const r = parseInt(color.substring(0, 2), 16);
	const g = parseInt(color.substring(2, 4), 16);
	const b = parseInt(color.substring(4, 6), 16);

	const newR = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)));
	const newG = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)));
	const newB = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)));

	const toHex = (value) => value.toString(16).padStart(2, '0');
	return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
};
