import type { LayoutLoad } from './$types';
import { supabaseGetUser } from '$lib/auth.svelte';

export const load: LayoutLoad = async () => {
	const user = await supabaseGetUser();

	return {
		user
	};
};

export const prerender = true;
