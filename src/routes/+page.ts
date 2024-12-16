import Heroes from '$lib/heroes.ts';
import { error } from '@sveltejs/kit';
import { createCounterPicks, deepCloneObject } from '$lib/helpers';
import type { HeroData } from '$lib';

export function load() {
	if (!Heroes) error(404);

	const heroes: HeroData[] = [];
	Heroes.forEach((h) => {
		const hero = deepCloneObject(h);
		hero.data = createCounterPicks(h);
		heroes.push(hero);
	});

	return {
		heroes
	};
}
