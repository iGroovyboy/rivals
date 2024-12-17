import Heroes from '$lib/heroes.ts';
import { error } from '@sveltejs/kit';
import { createCounterPicks, deepCloneObject } from '$lib/helpers';
import type { HeroData } from '$lib';
import type { PageLoad } from './$types';
import { db_fetch_json } from '$lib/api';

export const load: PageLoad = async () => {
	if (!Heroes) error(404);

	const heroes: HeroData[] = [];
	Heroes.forEach((h) => {
		const hero = deepCloneObject(h);
		hero.data = createCounterPicks(h);
		heroes.push(hero);
	});

	const item = await db_fetch_json('/rest/v1/heroes', 'GET');

	return {
		heroes,
		item
	};
};
