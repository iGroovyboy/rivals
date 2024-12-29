<script lang="ts">
	import { supabaseGetUser, supabaseLogin, supabaseLogout } from '$lib/auth.svelte.ts';
	import { LANG, setLocale } from '../../../i18n/i18n.ts';
	import { locale } from 'svelte-i18n';
	import SvgIcon from '$lib/components/SvgIcon.svelte';
	import { page } from '$app/state';
	import { _ } from 'svelte-i18n';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';

	let { user } = $props();

	let currentRoute = $derived(page.route.id || '');

	let isMenuShown = $state(false);

	const login = () => {
		supabaseLogin()
	};

	const logout = async () => {
		await supabaseLogout();
		user = await supabaseGetUser();
		isMenuShown = false;
	};

	const action = (name: string, ...args) => {
		isMenuShown = false;

		switch (name) {
			case 'fn':
				if (args[0] && typeof args[0] === 'function') {
					args[0]()
				}
				break;
			case 'goto':
				goto(args[0]);
				break;
			default:
				break;
		}
	};
</script>

<nav
	class="bot_nav_mobile fixed bottom-0 left-0 z-50 flex w-full flex-col
	bg-[var(--black)] text-[var(--white)] md:hidden"
>
	<ul class:hidden={!isMenuShown} class="menu flex flex-col">
		<li class="flex items-center border-b-2 border-white/30 p-2">
			{#if !user}
				<button class="flex w-full items-center gap-x-1" onclick={() => action('fn', login)}
					><img src="{base}/icons/web_dark_sq_na.svg" alt="Google icon" />{$_('menu.login')}</button
				>
			{:else}
				<div class="flex flex-col w-full">
					<button
						class="relative flex w-full items-center gap-x-1"
						onclick={() => action('fn', logout)}
					><img
						class="flex h-4"
						src={user?.user_metadata?.avatar_url || base + '/icons/person-circle-outline.svg'}
						onerror={(this.src = base + '/icons/person-circle-outline.svg')}
						alt="User avatar"
					/>{user.email}</button
					>
					<button class="flex w-full" onclick={logout}>{$_('menu.logout')}</button>
				</div>
			{/if}
		</li>
		<li class="flex items-center gap-x-2 border-b-2 border-white/30 p-2">
			<ul class="flex w-full justify-between">
				{#each Object.values(LANG) as lang}
					<li class:active={$locale?.toLowerCase() === lang.toLowerCase()}>
						<button
							class=""
							onclick={() => {
								setLocale(lang);
							}}>{lang.toUpperCase()}</button
						>
					</li>
				{/each}
			</ul>
		</li>
		<li class="flex items-center p-2">
			<button class="w-full text-left" onclick={() => action('goto', base + '/about')}>Help</button>
		</li>
	</ul>

	<ul class="flex h-7 w-full">
		<li class="flex w-1/4 items-center justify-center" class:active={currentRoute === '/'}>
			<button class="flex w-full justify-center" onclick={() => action('goto', base + '/')}
				><SvgIcon icon="HOME" active={currentRoute === '/'} /></button
			>
		</li>
		<li class="flex w-1/4 items-center justify-center" class:active={currentRoute === '/suggest'}>
			<button class="flex w-full justify-center" onclick={() => action('goto', base + '/suggest')}
				><SvgIcon icon="SUGGEST" active={currentRoute === '/suggest'} /></button
			>
		</li>
		<li class="flex w-1/4 items-center justify-center" class:active={currentRoute === '/tierlist'}>
			<button class="flex w-full justify-center" onclick={() => action('goto', base + '/tierlist')}
				><SvgIcon icon="LIST" active={currentRoute === '/tierlist'} /></button
			>
		</li>
		<li class="flex w-1/4 items-center justify-center">
			<button class="flex w-full justify-center" onclick={() => (isMenuShown = !isMenuShown)} aria-label="Menu"
				><SvgIcon icon="MENU" /></button
			>
		</li>
	</ul>
</nav>

<style>
	nav {
		li.active {
			background-color: var(--highlight);

			* {
				color: var(--dark-blue);
			}
		}
	}
</style>
