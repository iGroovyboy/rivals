<script lang="ts">
	import { page } from '$app/state';
	import { dndzone } from 'svelte-dnd-action';
	import type { APIHeroData } from '$lib';
	import HeroAvatar from '$lib/components/HeroAvatar.svelte';
	import ControlsBar from '$lib/components/ControlsBar.svelte';
	import { deepCloneObject } from '$lib/helpers.js';
	import { _ } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import { toast, TOAST_COLOR } from '$lib/toasts.svelte';
	import SvgIcon from '$lib/components/SvgIcon.svelte';
	import Seo from '$lib/components/Seo.svelte';

	let { data } = $props();

	const HEROES_LIST = 'HEROES_LIST';
	const LS_KEY_TIERLIST = 'tierlist';
	const URL_CUSTOM_DATA = 'custom_data';

	type Row = {
		id: string;
		text: string;
		color: string;
		items: APIHeroData[];
	};

	let rows: Row[] = $state([]);

	let isUserListAvailable = $state(false);

	let shareData = $state('');

	function handleDndConsider(e, i) {
		rows[i].items = e.detail.items;
	}

	function handleDndFinalize(e, i) {
		rows[i].items = e.detail.items;
	}

	const resetTierlist = () => {
		rows = deepCloneObject(data.tierlist);
	};

	const defaultTierlist = () => {
		rows = deepCloneObject(data.default);
	};

	const saveTierlist = () => {
		localStorage.setItem(LS_KEY_TIERLIST, JSON.stringify(rows));
		isUserListAvailable = localStorage.getItem(LS_KEY_TIERLIST) !== null;
	};

	const tryLoadDataFromStr = (str: string, fallback: () => {}) => {
		try {
			const obj = JSON.parse(str);
			rows = obj;
			toast($_('tierlist.message.ok_loaded_custom'));
		} catch (e) {
			console.error(e);
			fallback();
			toast($_('tierlist.message.bad_loaded_custom'), TOAST_COLOR.ORANGE);
		}
	};

	const loadLSTierlist = () => {
		const str = localStorage.getItem(LS_KEY_TIERLIST);

		if (!str) {
			defaultTierlist();
			return;
		}

		tryLoadDataFromStr(str, defaultTierlist);
	};

	const shareTierlist = () => {
		const data = encodeURIComponent(JSON.stringify(rows));
		const url = page.url.origin + page.url.pathname + `?${URL_CUSTOM_DATA}=${data}`;
		shareData = url;
	};

	const shareDataCopyToClipboard = () => {
		if (!shareData.length) {
			shareDataReset();
			return;
		}

		navigator.clipboard
			.writeText(shareData)
			.then(() => {
				toast($_('tierlist.message.ok_copy'));
				shareDataReset();
			})
			.catch((err) => {
				toast($_('tierlist.message.bad_copy'), TOAST_COLOR.RED);
			});
	};

	const shareDataReset = () => {
		shareData = '';
	};

	onMount(() => {
		console.log(page.url);

		isUserListAvailable = localStorage.getItem(LS_KEY_TIERLIST) !== null;

		if (page.url.searchParams.get(URL_CUSTOM_DATA)?.length) {
			console.log(
				'detected custom data in url with length ',
				page.url.searchParams.get(URL_CUSTOM_DATA)?.length
			);

			tryLoadDataFromStr(
				decodeURIComponent(page.url.searchParams.get(URL_CUSTOM_DATA)),
				defaultTierlist
			);
		} else {
			loadLSTierlist();
		}
	});
</script>

<Seo title="Best and Worst Characters" description="Explore, create and share the Marvel Rivals tier list with rankings of all characters, from strongest to weakest." />

<h1><strong>Marvel Rivals</strong> {$_('tierlist.heroes_tierlist')}</h1>

<div class="flex overflow-hidden bg-[var(--black)] px-1 md:bg-transparent">
	<ControlsBar gap="4">
		<div class="flex flex-col items-center justify-center w-full md:flex-row">
			<div class="flex gap-x-4">
				{#if isUserListAvailable}
					<button onclick={loadLSTierlist}>{$_('tierlist.mylist')}</button>
				{/if}
				<button onclick={defaultTierlist}>{$_('tierlist.default')}</button>
			</div>

			<div class="flex gap-x-4">
				<div class="separator mx-2 hidden w-[4px] rounded bg-white/40 md:flex"></div>

				<button class="flex flex-col md:flex-row items-center gap-x-1" onclick={resetTierlist}
					><SvgIcon icon="RESET" />
					<span class="text-xs md:text-base">{$_('tierlist.reset')}</span></button
				>
				<button class="flex flex-col md:flex-row items-center gap-x-1" onclick={saveTierlist}
					><SvgIcon icon="SAVE" /> <span class="text-xs md:text-base">{$_('tierlist.save')}</span></button
				>
				<button class="flex flex-col md:flex-row items-center gap-x-1" onclick={shareTierlist}
					><SvgIcon icon="SHARE" />
					<span class="text-xs md:text-base">{$_('tierlist.share')}</span></button
				>
			</div>
		</div>
	</ControlsBar>
</div>

{#if shareData.length}
	<div class="share my-1 flex gap-x-1">
		<button onclick={shareDataCopyToClipboard} aria-label="Copy url to clipboard">
			<svg class="ionicon" viewBox="0 0 512 512" fill="var(--white)"
				><path
					d="M456 480H136a24 24 0 01-24-24V128a16 16 0 0116-16h328a24 24 0 0124 24v320a24 24 0 01-24 24z"
				/><path
					d="M112 80h288V56a24 24 0 00-24-24H60a28 28 0 00-28 28v316a24 24 0 0024 24h24V112a32 32 0 0132-32z"
				/></svg
			>
		</button>
		<input
			class="w-full bg-[var(--black)] px-1 text-[var(--white)] text-xs md:text-base"
			readonly
			name="sharedUrl"
			bind:value={shareData}
		/>
	</div>
{/if}

<div class="mb-24 flex flex-col md:mb-0">
	{#each rows as row, i (row.id)}
		<section
			class="row relative min-h-10 w-full border-x-2 border-b-2 border-black first:border-t-2"
			class:service={row.id === HEROES_LIST}
		>
			<h3
				class="header absolute left-0 flex h-full min-w-5 items-center justify-center bg-[var(--bg)] md:min-w-10"
				style:--bg={row.color}
			>
				{row.text}
			</h3>

			<ul
				class="border-1 flex min-h-10 w-full flex-wrap bg-gray-800 pl-6 md:pl-10"
				use:dndzone={{ items: row.items }}
				onconsider={(e) => handleDndConsider(e, i)}
				onfinalize={(e) => handleDndFinalize(e, i)}
			>
				{#each row.items as item (item.id)}
					<li>
						<HeroAvatar name={item.name} classname={item.class} />
					</li>
				{/each}
			</ul>
		</section>
	{/each}
</div>

<style>
	.service {
		@apply fixed bottom-7 z-40 max-h-[25%] overflow-y-scroll border-2 border-t-white md:relative md:mt-12 md:max-h-none md:overflow-y-visible;

		.header {
			display: none;
		}

		ul {
			padding: 0.21rem;
			justify-content: center;
		}
	}

	svg {
		inline-size: 1rem;
	}
</style>
