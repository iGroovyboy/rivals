import type { PageLoad } from './$types';
import { api } from '$lib/api';
import { type APIHeroData, CLASS, type Counterpicks } from '$lib';
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

	return counterPicks;
};
