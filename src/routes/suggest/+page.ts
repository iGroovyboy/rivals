import type { PageLoad } from './$types';
import { api } from '$lib/api';

export const load: PageLoad = async () => {
	const heroes = await api.get('/rest/v1/heroes');

	return {
		heroes
	};
};
