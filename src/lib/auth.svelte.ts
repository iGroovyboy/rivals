import { PUBLIC_API_KEY, PUBLIC_API_URL } from '$env/static/public';
import { createClient } from '@supabase/supabase-js';
import { toast, TOAST_COLOR } from '$lib/toasts.svelte';

export const supabase = createClient(PUBLIC_API_URL, PUBLIC_API_KEY);

export const supabaseLogin = async () => {
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: 'google'
	});

	if (error) {
		toast("Couldn't login! Please try again later!", TOAST_COLOR.RED);
		console.error(error.message);
	}

	return {
		data,
		error
	};
};

export const supabaseLogout = async () => {
	const { error } = await supabase.auth.signOut();
	if (error) {
		console.error(error.message);
	}
};

export const supabaseGetUser = async () => {
	const {
		data: { user }
	} = await supabase.auth.getUser();
	return user;
};
