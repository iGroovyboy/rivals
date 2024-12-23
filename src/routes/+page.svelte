<script lang="ts">
	import { page } from '$app/stores';
	import { type APIHeroData, filterableClasses } from '$lib';
	import { filterHeroesByClass } from '$lib/helpers';
	import HeroBigAvatar from '$lib/components/HeroBigAvatar.svelte';
	import ClassAvatar from '$lib/components/ClassAvatar.svelte';
	import HeroAvatar from '$lib/components/HeroAvatar.svelte';
	import { useStore } from '$lib/store.svelte';
	import ControlsBar from '$lib/components/ControlsBar.svelte';
	import { _ } from 'svelte-i18n';

	let { data } = $props();

	let searchText = $state('');

	let currentClass = $derived($page.url.searchParams.get('class') || '');

	let canFilterByClass = $derived(filterableClasses.includes(currentClass));

	let isLayoutGrid = $state(false);

	let isFavoritesOn = $state(false);

	let filteredHeroesByClass: APIHeroData[] = $derived(
		canFilterByClass ? filterHeroesByClass(data.heroes, currentClass) : data.heroes
	);

	let filteredHeroes: APIHeroData[] = $derived.by(() => {
		const prefilteredHeroes = isFavoritesOn
			? filterFavorites(filteredHeroesByClass)
			: filteredHeroesByClass;

		return searchText.length
			? prefilteredHeroes.filter((h) => {
					return h.name.toLowerCase().includes(searchText?.toLowerCase());
				})
			: prefilteredHeroes;
	});

	const filterFavorites = (heroes: APIHeroData[]): APIHeroData[] => {
		return heroes.filter((h) => useStore.favorites.includes(h.name));
	};

	const clearFilter = () => {
		searchText = '';
	};
</script>

<h1><strong>Marvel Rivals</strong> {$_('main.header')}</h1>

<ControlsBar gap='3'>
		<button
			class="flex items-center gap-x-0.5 text-sm uppercase"
			onclick={() => (isLayoutGrid = !isLayoutGrid)}
		>
			<svg
				class={isLayoutGrid ? 'fill-[var(--highlight)]' : 'fill-[var(--white)] opacity-50'}
				viewBox="0 0 512 512"
				><path
					d="M240 240H32V32h208zM480 240H272V32h208zM240 480H32V272h208zM480 480H272V272h208z"
				/></svg
			>
			{$_('main.grid')}
		</button>

		<div class="flex items-center gap-x-1 px-2">
			<input type="checkbox" name="fav" id="fav" class="h-3 w-3" bind:checked={isFavoritesOn} />
			<label for="fav" class="text-sm uppercase">{$_('main.favorites')}</label>
		</div>

		<div
			class="search -mt-0.5 mr-0.5 flex h-6 w-full -skew-x-12 items-center justify-between bg-[var(--light-grey)]"
		>
			<label class="mx-4 uppercase text-[var(--black)]" for="search">{$_('main.filter')}</label>
			<div class="decor mr-0.5 h-full min-w-[4px] bg-[var(--white)]"></div>
			<div class="decor mr-0.5 h-full min-w-[4px] bg-[var(--white)]"></div>
			<input
				class="h-6 w-10/12 px-1 pr-6 text-[var(--black)] outline-0"
				type="text"
				name="search"
				id="search"
				bind:value={searchText}
			/>
			<button class="absolute right-0 w-4 cursor-pointer bg-transparent" onclick={clearFilter}>
				<img src="/icons/close-outline.svg" alt="Clear filter" />
			</button>
		</div>
</ControlsBar>

<div class="list relative flex flex-col" class:isLayoutGrid>
	{#each filteredHeroes as hero}
		<div class="cell mb-4 flex w-[48%] gap-x-4">
			<HeroBigAvatar name={hero.name} classname={hero.class} isFavShown />
			{#if hero.counterpicks}
				<div class="counterpicks flex flex-col justify-around">
					{#each Object.entries(hero.counterpicks) as [heroClass, heroesList]}
						<div class="flex ">
							{#if heroesList.length}
								<ClassAvatar classname={heroClass} />

								<div class="flex">
									<ul class="counters-main ml-1 flex items-center relative">
										{#each heroesList.slice(0, 3) as counterHero}
											<li>
												<HeroAvatar name={counterHero.name} classname={counterHero.class} />
											</li>
										{/each}
									</ul>

									{#if heroesList.slice(3).length}
										<ul class="counters-extra ml-1">
											{#each heroesList.slice(3) as counterHero}
												<li class="flex items-center justify-center w-5 h-4">
													<HeroAvatar autosize name={counterHero.name} classname={counterHero.class} />
												</li>
											{/each}
										</ul>
									{/if}
								</div>


							{/if}
						</div>
					{/each}
				</div>
			{:else}
				<div class="oops">
					<p>{$_('main.no_counterpicks')}</p>
					<p><a href="/suggest">{$_('main.suggest')}</a> {$_('main.some')}!</p>
				</div>
			{/if}
		</div>
	{:else}
		<p>{$_('main.no_heroes_data')}</p>
	{/each}
</div>

<style>
	a {
		color: var(--highlight);
		text-shadow:
			-1px 1px 0 #000,
			2px -1px 0 #000;
		font-weight: 600;
	}

	.isLayoutGrid {
		flex-direction: row;
		flex-wrap: wrap;
		column-gap: 50px;
	}

	svg {
		inline-size: 0.8rem;
	}

  .counters-extra {
      display: grid;
      grid-template-rows: repeat(2, auto);
      grid-auto-flow: column;
			column-gap: 0.1rem;
	}
</style>
