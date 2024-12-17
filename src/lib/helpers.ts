import {
	type APIHeroData,
	CLASS,
	type Counterpicks,
	filterableClasses,
	type HeroData
} from '$lib/index';
import Heroes from '$lib/heroes';

export const createCounterPicks = (hero: HeroData): null | Counterpicks => {
	const counterNames = hero.counterpicks;

	if (!counterNames) {
		return null;
	}

	const counterPicks = {
		[CLASS.VANGUARD]: [],
		[CLASS.DUELIST]: [],
		[CLASS.STRATEGIST]: []
	};

	Heroes.filter((h) => counterNames.includes(h.name)).forEach((h) => {
		counterPicks[h.role].push(h);
	});

	return counterPicks;
};

export const deepCloneObject = (obj: unknown) => {
	return JSON.parse(JSON.stringify(obj));
};

export const filterHeroesByClass = (data: HeroData[], classname: string): HeroData[] => {
	if (filterableClasses.includes(classname)) {
		return data.filter((h) => {
			return h.role.toLowerCase() === classname;
		});
	}

	return data;
};

export const getHeroByName = (data: APIHeroData[], name: string) =>
	data?.find((h) => h.name === name);
