<script lang="ts">
	import Heroes from './Heroes.svelte';
	import Button from '$lib/components/Button.svelte';
	import { getHeroByName } from '$lib/helpers';
	import { supabase } from '$lib/auth.svelte';
	import { toast, TOAST_COLOR } from '$lib/toasts.svelte';
	import { _ } from 'svelte-i18n';

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
				hero_id,
				counter_hero_id
			};
			counterPicks.push(row);
		}

		try {
			const { error } = await supabase.from('counterpicks').insert(counterPicks).select();

			if (error) {
				console.error(error.message);
				toast($_('suggest.errors.generic_1'), TOAST_COLOR.RED);
			}

			selectedMain = [];
			selectedHeroes = [];
			toast($_('suggest.saved'));
		} catch (e) {
			toast($_('suggest.errors.generic_1'), TOAST_COLOR.RED);
		}

		isLoading = false;
	};
</script>

<h1><strong>Marvel Rivals</strong> Suggest Counterpicks</h1>

<div class="flex flex-col md:flex-row justify-between overflow-hidden">
	<div class="flex flex-col">
		<h2 class="w-full text-center">{$_('suggest.pick_hero')}</h2>

		<Heroes data={data.heroes} bind:selected={selectedMain} isSingleSelection />
	</div>

	<div class="splitter mt-6 opacity-45">
		<img class="hidden md:static " src="/img/vertical-line.svg" alt="decoration" />
	</div>

	<div class="flex flex-col">
		<h2 class="w-full text-center">{$_('suggest.pick_counter')}</h2>

		<Heroes data={data.heroes} bind:selected={selectedHeroes} />
	</div>
</div>

<div class="flex justify-center mb-12">
	<Button disabled={isLoading || !canSave} onclick={save}>{$_('suggest.submit')}</Button>
</div>
