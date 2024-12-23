<script lang="ts">
	import { dndzone } from 'svelte-dnd-action';
	import type { APIHeroData } from '$lib';
	import HeroAvatar from '$lib/components/HeroAvatar.svelte';
	import ControlsBar from '$lib/components/ControlsBar.svelte';
	import { deepCloneObject } from '$lib/helpers.js';
	import { _ } from 'svelte-i18n';
	import { onMount } from 'svelte';

	let { data } = $props();

	const HEROES_LIST = 'HEROES_LIST';

	type Row = {
		id: string;
		text: string;
		color: string;
		items: APIHeroData[];
	};

	let rows: Row[] = $state([]);

	function handleDndConsider(e, i) {
		rows[i].items = e.detail.items;
	}

	function handleDndFinalize(e, i) {
		rows[i].items = e.detail.items;
	}

	const resetTierlist = () => {
		rows = deepCloneObject(data.tierlist)
	};

	const defaultTierlist = () => {
		rows = deepCloneObject(data.default)
	};

	onMount(() => {
		defaultTierlist();
	})
</script>

<h1><strong>Marvel Rivals</strong> {$_('tierlist.heroes_tierlist')}</h1>

<ControlsBar gap="4">
	<button onclick={defaultTierlist}>{$_('tierlist.default')}</button>
	<button onclick={resetTierlist}>{$_('tierlist.reset')}</button>
</ControlsBar>

<div class="flex flex-col">
	{#each rows as row, i (row.id)}
		<section
			class="row relative min-h-10 w-full border-b-2 border-x-2 first:border-t-2 border-black"
			class:service={row.id === HEROES_LIST}
		>
			<h3
				class="header absolute left-0 flex h-full min-w-10 items-center justify-center bg-[var(--bg)]"
				style:--bg={row.color}
			>
				{row.text}
			</h3>

			<ul
				class="border-1 flex min-h-10 w-full flex-wrap bg-gray-800 pl-10"
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
		margin-top: 1rem;

			.header {
					display: none;
			}

			ul {
          padding: 0.21rem;
					justify-content: center;
			}
	}
</style>
