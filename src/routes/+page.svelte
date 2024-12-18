<script lang="ts">
	import { page } from '$app/stores';
	import { type APIHeroData, filterableClasses } from '$lib';
	import { filterHeroesByClass } from '$lib/helpers';
	import HeroBigAvatar from '$lib/components/HeroBigAvatar.svelte';
	import ClassAvatar from '$lib/components/ClassAvatar.svelte';
	import HeroAvatar from '$lib/components/HeroAvatar.svelte';

	let { data } = $props();

	let searchText = $state('');

	let currentClass = $derived($page.url.searchParams.get('class') || '');

	let canFilterByClass = $derived(filterableClasses.includes(currentClass));

	let isLayoutGrid = $state(false);

	let filteredHeroesByClass: APIHeroData[] = $derived(
		canFilterByClass ? filterHeroesByClass(data.heroes, currentClass) : data.heroes
	);

	let filteredHeroes: APIHeroData[] = $derived(
		searchText.length
			? filteredHeroesByClass.filter((h) => {
					return h.name.toLowerCase().includes(searchText?.toLowerCase());
				})
			: filteredHeroesByClass
	);

	const clearFilter = () => {
		searchText = '';
	};
</script>

<h1>Counter Picks</h1>

<div class="w-12/12 mb-4 flex h-6 2xl:w-8/12">
	<div class="bg w-12/12 absolute -left-1 z-0 h-6 -skew-x-12 bg-[var(--black)] 2xl:w-8/12"></div>

	<div class="controls relative z-10 flex w-full gap-x-6 text-[var(--white)]">
		<button
			class="flex items-center gap-x-0.5 uppercase"
			onclick={() => (isLayoutGrid = !isLayoutGrid)}
		>
			<svg
				class={isLayoutGrid ? 'fill-[var(--highlight)]' : 'fill-[var(--white)] opacity-50'}
				viewBox="0 0 512 512"
				><path
					d="M240 240H32V32h208zM480 240H272V32h208zM240 480H32V272h208zM480 480H272V272h208z"
				/></svg
			>
			Grid
		</button>

		<div
			class="search -mt-0.5 mr-0.5 flex h-6 w-full -skew-x-12 items-center justify-between bg-[var(--light-grey)]"
		>
			<label class="mx-4 uppercase text-[var(--black)]" for="search">Filter</label>
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
	</div>
</div>

<div class="list relative flex flex-col" class:isLayoutGrid>
	{#each filteredHeroes as hero}
		<div class="cell mb-4 flex gap-x-4 w-[48%]">
			<HeroBigAvatar name={hero.name} classname={hero.class} isFavShown />
			{#if hero.counterpicks}
				<div class="counterpicks flex flex-col justify-around">
					{#each Object.entries(hero.counterpicks) as [heroClass, heroesList]}
						<div class="flex items-center gap-x-2">
							{#if heroesList.length}
								<ClassAvatar classname={heroClass} />
								<ul class="counters flex gap-x-2">
									{#each heroesList as counterHero}
										<li>
											<HeroAvatar name={counterHero.name} classname={counterHero.class} />
										</li>
									{/each}
								</ul>
							{/if}
						</div>
					{/each}
				</div>
			{:else}
				<div class="oops">
					<p>No counterpicks for the hero yet!</p>
					<p><a href="/suggest">Suggest</a> some!</p>
				</div>
			{/if}
		</div>
	{:else}
		<p>No heroes data found!</p>
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
		inline-size: 1rem;
	}
</style>
