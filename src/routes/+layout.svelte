<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { restoreStore } from '$lib/store.svelte';
	import type { User } from '@supabase/supabase-js';
	import Toasts from '$lib/components/Toasts.svelte';
	import { initI18N } from '../i18n/i18n';
	import NavDesktop from '$lib/components/nav/NavDesktop.svelte';
	import ClassesMobile from '$lib/components/nav/ClassesMobile.svelte';
	import NavMobile from '$lib/components/nav/NavMobile.svelte';
	import { browser } from '$app/environment';

	let { children, data } = $props();

	let user = $state<null | User>(null);

	onMount(() => {
		initI18N();
		restoreStore();
		user = data.user;
	});

	if (browser) {
		window.dataLayer = window.dataLayer || [];
		window.gtag = function gtag(){window.dataLayer.push(arguments);}
		window.gtag('js', new Date());

		window.gtag('config', 'G-7T6LTHK7V7');
	}
</script>

<div class="bg -z-10"></div>

<ClassesMobile />

<NavMobile {user} />

<NavDesktop {user} />

<div class="wrapper z-0 mx-auto w-full pt-8 md:w-9/12">
	{@render children()}
</div>

<Toasts />

<svelte:head>
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-7T6LTHK7V7"></script>
</svelte:head>

<style>
	.bg {
		background-color: var(--light-blue);
		position: fixed;
		width: 100vw;
		height: 100vh;
		left: 0;
		transform: skewX(-10deg) translateX(4vw);
		pointer-events: none;
	}
</style>
