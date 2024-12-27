import { createClient } from '@supabase/supabase-js';
import { toast, TOAST_COLOR } from '$lib/toasts.svelte';

export const supabase = createClient(
	'https://agqsdtupansgyvtqfsgl.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFncXNkdHVwYW5zZ3l2dHFmc2dsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQzOTA5ODMsImV4cCI6MjA0OTk2Njk4M30.sD8kYscPLAmJeZB-BMu_wALFhYRtkaTL1CorhTFUD34'
);

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
