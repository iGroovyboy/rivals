<script lang="ts">
	import { CLASS } from '$lib';
	import { supabaseGetUser, supabaseLogin, supabaseLogout } from '$lib/auth.svelte.ts';
	import Submenu from '$lib/components/Submenu.svelte';
	import { page } from '$app/state';
	import { _ } from 'svelte-i18n';
	import Profile from '../../../routes/Profile.svelte';
	import { LANG, setLocale } from '../../../i18n/i18n.ts';
	import { base } from '$app/paths';

	let { user } = $props();

	let currentClass = $derived(page.url.searchParams.get('class') || '');

	let currentRoute = $derived(page.route.id || '');

	let isOptionsShown = $state(false);

	let isProfileShown = $state(false);

	const onLogout = async () => {
		await supabaseLogout();
		user = await supabaseGetUser();
		isProfileShown = false;
	};
</script>

<nav
	class="nav_desktop fixed z-50 hidden h-7 w-full justify-between bg-[var(--black)] text-[var(--white)] md:flex"
>
	<div class="title mx-2 flex w-1/12 justify-center">
		<svg viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M0.752 62.648V18.68H15.216V22.52H7.6V58.808H15.216V62.648H0.752ZM84.5645 62.648V58.808H92.1805V22.52H84.5645V18.68H99.0285V62.648H84.5645Z"
				fill="white"
			/>
			<path
				d="M56.5 0C68.3333 0.833333 96.9 6.7 98.5 7.5L42.5 26.5L88 38.5L46 53L95 74L51 79.5L16 53L60.5 41L16 31.5L56.5 0Z"
				fill="white"
			/>
		</svg>
	</div>
	<div class="menu flex w-11/12 flex-row justify-between px-6">
		<div class="start">
			<ul class="flex h-full">
				<li class="flex items-center px-2" class:active={currentClass === CLASS.ALL}>
					<a class="capitalize" href="{base}/?class={CLASS.ALL}">{$_('class.all')}</a>
				</li>
				<li class="flex items-center px-2" class:active={currentClass === CLASS.VANGUARD}>
					<a class="flex capitalize" href="{base}/?class={CLASS.VANGUARD}">{$_('class.vanguard')}</a
					>
				</li>
				<li class="flex items-center px-2" class:active={currentClass === CLASS.DUELIST}>
					<a class="capitalize" href="{base}/?class={CLASS.DUELIST}">{$_('class.duelist')}</a>
				</li>
				<li class="flex items-center px-2" class:active={currentClass === CLASS.STRATEGIST}>
					<a class="capitalize" href="{base}/?class={CLASS.STRATEGIST}">{$_('class.strategist')}</a>
				</li>

				<li class="bpx-2 flex items-center">
					<div class="separator mx-2 h-4 w-[4px] rounded bg-white/40"></div>
				</li>
				<li class="flex items-center px-2" class:active={currentRoute === '/suggest'}>
					<a href="{base}/suggest">{$_('menu.suggest')}</a>
				</li>
				<li class="flex items-center px-2" class:active={currentRoute === '/tierlist'}>
					<a href="{base}/tierlist">{$_('menu.tierlist')}</a>
				</li>
			</ul>
		</div>
		<div class="end">
			<ul class="flex h-full">
				<li class="flex items-center px-2" class:active={isProfileShown}>
					{#if !user}
						<button class="flex items-center gap-x-1" onclick={supabaseLogin}
							><img src="{base}/icons/web_dark_sq_na.svg" alt="Google icon" />{$_(
								'menu.login'
							)}</button
						>
					{:else}
						<button
							class="relative flex items-center gap-x-1"
							onclick={() => (isProfileShown = !isProfileShown)}
							><img
								class="flex h-4"
								src={user?.user_metadata?.avatar_url}
								onerror={(this.src = '{base}/icons/person-circle-outline.svg')}
								alt="User avatar"
							/>{$_('profile.profile')}</button
						>
					{/if}
				</li>

				<li class="flex items-center px-2">
					<button aria-label="Show options" onclick={() => (isOptionsShown = !isOptionsShown)}>
						<svg
							viewBox="0 0 512 512"
							class="ionicon gear stroke-white stroke-1 transition-all hover:rotate-45 hover:stroke-[var(--highlight)]"
							><path
								d="M262.29 192.31a64 64 0 1057.4 57.4 64.13 64.13 0 00-57.4-57.4zM416.39 256a154.34 154.34 0 01-1.53 20.79l45.21 35.46a10.81 10.81 0 012.45 13.75l-42.77 74a10.81 10.81 0 01-13.14 4.59l-44.9-18.08a16.11 16.11 0 00-15.17 1.75A164.48 164.48 0 01325 400.8a15.94 15.94 0 00-8.82 12.14l-6.73 47.89a11.08 11.08 0 01-10.68 9.17h-85.54a11.11 11.11 0 01-10.69-8.87l-6.72-47.82a16.07 16.07 0 00-9-12.22 155.3 155.3 0 01-21.46-12.57 16 16 0 00-15.11-1.71l-44.89 18.07a10.81 10.81 0 01-13.14-4.58l-42.77-74a10.8 10.8 0 012.45-13.75l38.21-30a16.05 16.05 0 006-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 00-6.07-13.94l-38.19-30A10.81 10.81 0 0149.48 186l42.77-74a10.81 10.81 0 0113.14-4.59l44.9 18.08a16.11 16.11 0 0015.17-1.75A164.48 164.48 0 01187 111.2a15.94 15.94 0 008.82-12.14l6.73-47.89A11.08 11.08 0 01213.23 42h85.54a11.11 11.11 0 0110.69 8.87l6.72 47.82a16.07 16.07 0 009 12.22 155.3 155.3 0 0121.46 12.57 16 16 0 0015.11 1.71l44.89-18.07a10.81 10.81 0 0113.14 4.58l42.77 74a10.8 10.8 0 01-2.45 13.75l-38.21 30a16.05 16.05 0 00-6.05 14.08c.33 4.14.55 8.3.55 12.47z"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="32"
							/></svg
						>
					</button>
				</li>
				<li class="flex items-center px-2" class:active={currentRoute === '/about'}>
					<a href="{base}/about">?</a>
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

{#if isOptionsShown}
	<div class="fixed right-0 top-7 z-50">
		<Submenu>
			<p>{$_('menu.pick_lang')}:</p>
			{#each Object.values(LANG) as lang}
				<button
					class=""
					onclick={() => {
						setLocale(lang);
						isOptionsShown = false;
					}}>{lang.toUpperCase()}</button
				>
			{/each}
		</Submenu>
	</div>
{/if}

<style>
	.title {
		svg {
			inline-size: 1.2rem;
		}
	}

	nav {
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

		svg {
			inline-size: 0.8rem;
		}
	}
</style>
