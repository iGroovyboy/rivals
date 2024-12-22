import type { PageLoad } from './$types';
import type { APIHeroData } from '$lib';
import { supabase } from '$lib/auth.svelte';

export const load: PageLoad = async () => {
	let { data: heroes }: { data: APIHeroData[] } = await supabase.from('heroes').select('*');
	if (!heroes) {
		console.error('No heroes found.');
	}

	return {
		heroes
	};
};
