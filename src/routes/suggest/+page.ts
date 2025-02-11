import type { PageLoad } from './$types';
import { fetchHeroesData } from '$lib/helpers';

export const load: PageLoad = async () => {
	const heroes = await fetchHeroesData();

	return {
		heroes
	};
};
