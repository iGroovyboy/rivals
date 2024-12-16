<script lang="ts">
	import { page } from '$app/stores';
	import HeroBigAvatar from './HeroBigAvatar.svelte';
	import ClassAvatar from './ClassAvatar.svelte';
	import HeroAvatar from './HeroAvatar.svelte';
	import { filterableClasses, type HeroData } from '$lib';
	import { filterHeroesByClass } from '$lib/helpers';

	let { data } = $props();

	let searchText = $state('');

	let currentClass = $derived($page.url.searchParams.get('class') || '');

	let canFilterByClass = $derived(filterableClasses.includes(currentClass));

	let filteredHeroesByClass: HeroData[] = $derived(
		canFilterByClass ? filterHeroesByClass(data.heroes, currentClass) : data.heroes
	);

	let filteredHeroes: HeroData[] = $derived(
		searchText.length
			? filteredHeroesByClass.filter((h) => {
					return h.name.toLowerCase().includes(searchText.toLowerCase());
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
<!--		<button class="flex gap-x-0.5 items-center uppercase">-->
<!--			<img class="w-4 opacity-70" src="/icons/list-sharp.svg" alt=""> List-->
<!--		</button>-->

<!--		<button class="flex gap-x-0.5 items-center uppercase">-->
<!--			<img class="w-3 opacity-70" src="/icons/grid-sharp.svg" alt=""> Grid-->
<!--		</button>-->

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
				<img
					src="/icons/close-outline.svg"
					alt="Clear filter"
				/>
			</button>


		</div>
	</div>
</div>

<div class="list flex flex-col">
	{#each filteredHeroes as hero}
		<div class="row mb-4 flex gap-x-4">
			<HeroBigAvatar filename="Doctor_Strange.webp" name={hero.name} classname={hero.role} />
			{#if hero.data}
				<div class="counterpicks flex flex-col justify-around">
					{#each Object.entries(hero.data) as [heroClass, heroesList]}
						<div class="flex items-center gap-x-2">
							{#if heroesList.length}
								<ClassAvatar classname={heroClass} />
								<ul class="counters flex gap-x-2">
									{#each heroesList as counterHero}
										<li>
											<!--											<HeroAvatar-->
											<!--												filename={counterHero.icon}-->
											<!--												name={counterHero.name}-->
											<!--												classname={heroClass}-->
											<!--											/>-->
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
					<p>Please <a href="/suggest">suggest</a> some!</p>
				</div>
			{/if}
		</div>
	{:else}
		<p>No heroes data found!</p>
	{/each}
</div>

<style>
</style>
