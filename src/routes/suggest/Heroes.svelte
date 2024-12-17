<script lang="ts">
	import { type APIHeroData, type Classname, filterableClasses } from '$lib';
	import ClassAvatar from '$lib/components/ClassAvatar.svelte';
	import HeroAvatar from '$lib/components/HeroAvatar.svelte';
	import HeroBigAvatar from '$lib/components/HeroBigAvatar.svelte';
	import { getHeroByName } from '$lib/helpers';

	interface Props {
		data: APIHeroData[];
		isSingleSelection: boolean;
		selected: string[];
	}

	let { data, isSingleSelection, selected = $bindable([]) } = $props<Props>();

	const heroesByClass = (data: APIHeroData[], classname: Classname) => {
		return data.filter((h) => h.class.toLowerCase() === classname);
	};

	export const toggleHero = (name: string) => {
		if (selected.includes(name)) {
			selected = selected.filter((h) => h !== name);
			return;
		}

		selected.push(name);
		selected = [...new Set([...selected, name])];
	};
</script>

<div class="heroes flex flex-grow flex-col">
	{#if isSingleSelection && selected.length}
		<div onclick={() => toggleHero(selected[0])} class="flex h-full items-center justify-center">
			<HeroBigAvatar name={selected[0]} classname={getHeroByName(data, selected[0])?.class} />
		</div>
	{:else}
		{#each filterableClasses as heroClass}
			<section class="mb-4 flex gap-x-1">
				<ClassAvatar classname={heroClass} />

				<div class="heroes grid grid-cols-4 gap-1">
					{#each heroesByClass(data, heroClass) as hero}
						<HeroAvatar
							onclick={() => toggleHero(hero.name)}
							name={hero.name}
							classname={heroClass}
							selected={selected.includes(hero.name)}
						/>
					{/each}
				</div>
			</section>
		{/each}
	{/if}
</div>
