<script lang="ts">
	import Heroes from './Heroes.svelte';
	import Button from '$lib/components/Button.svelte';
	import { getHeroByName } from '$lib/helpers';
	import { supabase } from '$lib/auth.svelte';

	let { data } = $props();

	let selectedMain = $state([]);
	let selectedHeroes = $state([]);
	let canSave = $derived(selectedMain.length && selectedHeroes.length);
	let isLoading = $state(false);

	const save = async () => {
		if (!canSave) {
			return;
		}

		isLoading = true;
		const counterPicks = [];
		for (let counterpickName of selectedHeroes) {
			const hero_id = getHeroByName(data.heroes, selectedMain[0])?.id;
			const counter_hero_id = getHeroByName(data.heroes, counterpickName)?.id;
			const row = {
				hero_id, counter_hero_id
			}
			counterPicks.push(row);
		}

		try	{
			const { error } = await supabase
				.from('counterpicks')
				.insert(counterPicks)
				.select()

			if (error) {
				console.error(error.message);
				// TODO toast - something gone wrong
			}

			selectedMain = [];
			selectedHeroes = [];
			// toast
		} catch (e) {
			// toast
			// TODO toast - something gone wrong
		}

		isLoading = false;
	};
</script>

<div class="flex justify-between">
	<div class="flex flex-col">
		<h2 class="w-full text-center">Pick a hero</h2>

		<Heroes data={data.heroes} bind:selected={selectedMain} isSingleSelection />
	</div>

	<div class="splitter mt-6 opacity-45">
		<img src="/img/vertical-line.svg" alt="decoration">
	</div>

	<div class="flex flex-col">
		<h2 class="w-full text-center">Pick the hero's counterpicks</h2>

		<Heroes data={data.heroes} bind:selected={selectedHeroes}  />
	</div>
</div>

<div class="flex justify-center">
	<Button disabled={isLoading || !canSave} onclick={save}>Suggest</Button>
</div>