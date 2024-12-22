<script lang="ts">
	import '../app.css';
	import { CLASS } from '$lib';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { restoreStore } from '$lib/store.svelte';
	import { supabaseGetUser, supabaseLogin, supabaseLogout } from '$lib/auth.svelte';
	import Profile from './Profile.svelte';
	import type { User } from '@supabase/supabase-js';
	import Toasts from '$lib/components/Toasts.svelte';

	let { children, data } = $props();

	let currentClass = $derived($page.url.searchParams.get('class') || '');

	let currentRoute = $derived($page.route.id || '');

	let user = $state<null | User>(null);

	let isProfileShown = $state(false);

	const onLogout = async () => {
		await supabaseLogout();
		user = await supabaseGetUser();
		isProfileShown = false;
	};

	onMount(() => {
		restoreStore();
		user = data.user;
	});
</script>

<div class="bg -z-10"></div>

<nav class="z-50 flex w-full justify-between overflow-hidden">
	<div class="title mx-2 flex w-1/12 justify-center">[R-C-P]</div>
	<div class="menu flex w-11/12 flex-row justify-between px-6">
		<div class="start">
			<ul class="flex h-full">
				<li class="flex items-center px-2" class:active={currentClass === CLASS.ALL}>
					<a class="capitalize" href="/?class={CLASS.ALL}">{CLASS.ALL}</a>
				</li>
				<li class="flex items-center px-2" class:active={currentClass === CLASS.VANGUARD}>
					<a class="flex capitalize" href="/?class={CLASS.VANGUARD}">{CLASS.VANGUARD}</a>
				</li>
				<li class="flex items-center px-2" class:active={currentClass === CLASS.DUELIST}>
					<a class="capitalize" href="/?class={CLASS.DUELIST}">{CLASS.DUELIST}</a>
				</li>
				<li class="flex items-center px-2" class:active={currentClass === CLASS.STRATEGIST}>
					<a class="capitalize" href="/?class={CLASS.STRATEGIST}">{CLASS.STRATEGIST}</a>
				</li>
				<!--				<li class="bpx-2 flex items-center">-->
				<!--					<div class="separator w-[4px] h-4 mx-2 rounded bg-white/40"></div>-->
				<!--				</li>-->
			</ul>
		</div>
		<div class="end">
			<ul class="flex h-full">
				<li class="flex items-center px-2" class:active={currentRoute === '/tierlist'}>
					<a href="/tierlist">Tierlist</a>
				</li>
				<li class="flex items-center px-2" class:active={currentRoute === '/suggest'}>
					<a href="/suggest">Suggest</a>
				</li>
				<li class="flex items-center px-2" class:active={isProfileShown}>
					{#if !user}
						<button class="flex items-center gap-x-1" onclick={supabaseLogin}
							><img src="/icons/web_dark_sq_na.svg" alt="Google icon" />Login</button
						>
					{:else}
						<button
							class="relative flex items-center gap-x-1"
							onclick={() => (isProfileShown = !isProfileShown)}
							><img
								class="flex h-4"
								src={user?.user_metadata?.avatar_url}
								onerror={this.src='/icons/person-circle-outline.svg'}
								alt="User avatar"
							/>Profile</button
						>
					{/if}
				</li>
				<li class="flex items-center px-2" class:active={currentRoute === '/about'}>
					<a href="/about">?</a>
				</li>
			</ul>
		</div>
	</div>
</nav>
{#if user && isProfileShown}
	<div class="fixed right-0 top-7 z-50">
		<Profile {user} {onLogout} />
	</div>
{/if}

<div class="wrapper z-0 mx-auto w-9/12 pt-8">
	{@render children()}
</div>

<Toasts />

<style>
	.bg {
		background-color: var(--light-blue);
		position: fixed;
		width: 95vw;
		height: 100vh;
		transform: skewX(-10deg) translateX(4vw);
		pointer-events: none;
	}

	nav {
		position: fixed;
		width: 100%;
		height: 70px;
		background-color: var(--black);
		color: var(--white);

		li {
			a:hover,
			button:hover,
			div:hover {
				color: var(--highlight);
			}

			&.active {
				background-color: var(--highlight);
				color: var(--dark-blue);

				a:hover {
					color: var(--dark-blue);
				}
			}
		}
	}
</style>
