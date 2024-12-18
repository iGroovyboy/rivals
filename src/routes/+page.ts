import type { PageLoad } from './$types';
import { api } from '$lib/api';
import { type APIHeroData, CLASS, type Counterpicks, filterableClasses } from '$lib';
import { getCounterpicksByHeroId } from '$lib/helpers';

export const load: PageLoad = async () => {
	const counterpicks = await api.get('/rest/v1/counterpicks');
	const heroes: APIHeroData[] = await api.get('/rest/v1/heroes');

	const data = heroes.map((hero) => {
		return {
			...hero,
			counterpicks: prepareCounterpicks(getCounterpicksByHeroId(hero.id, heroes, counterpicks))
		};
	});

	return {
		heroes: data
	};
};

const prepareCounterpicks = (heroes: APIHeroData[]): null | Counterpicks => {
	if (!heroes || !heroes.length) {
		return null;
	}

	const counterPicks: Counterpicks = {
		[CLASS.VANGUARD]: [],
		[CLASS.DUELIST]: [],
		[CLASS.STRATEGIST]: []
	};

	heroes.forEach((h) => {
		counterPicks[h.class].push(h);
	});

	// sort heroes based on appearance count in list
	filterableClasses.forEach((heroClass) => {
		let refHeroesArr: string[] = [];
		counterPicks[heroClass].forEach((h) => refHeroesArr.push(h.name));
		refHeroesArr = getReferenceWeightedHeroesArray(refHeroesArr);

		const destArr: APIHeroData[] = [];
		refHeroesArr.forEach((h) => {
			const item = counterPicks[heroClass].find((i) => i.name === h);
			destArr.push(item);
		});
		counterPicks[heroClass] = destArr;
	});

	return counterPicks;
};

// sort arr based on appearance count in list
const getReferenceWeightedHeroesArray = (arr: string[]): string[] => {
	const countMap = new Map();
	const result = [];

	arr.forEach((item) => {
		countMap.set(item, (countMap.get(item) || 0) + 1);
	});

	const repeated = Array.from(countMap.entries())
		.filter(([_, count]) => count > 1)
		.sort((a, b) => b[1] - a[1])
		.map(([item]) => item);

	const unique = new Set();

	repeated.forEach((item) => {
		result.push(item);
		unique.add(item);
	});

	arr.forEach((item) => {
		if (!unique.has(item)) {
			result.push(item);
			unique.add(item);
		}
	});

	return result;
};
