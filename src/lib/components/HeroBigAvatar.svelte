<script lang="ts">
	import Star from '$lib/components/Star.svelte';
	import { useStore } from '$lib/store.svelte';

	let { name, classname, isFavShown } = $props();

	let isFavorite = $derived(useStore.favorites.includes(name));

	const iconFilename = (name: string): string => {
		return name?.toLowerCase().replaceAll(' ', '_').replaceAll('&', 'n') + '.png';
	};
</script>

<div class="hero-big-avatar relative">
	<div class="frame">
		<img src="/icons/{classname}/{iconFilename(name)}" alt={name} />
	</div>
	{#if isFavShown}
	<div class="absolute left-1 top-3">
		<Star onclick={() => useStore.favorites = name} checked={isFavorite} />
	</div>
	{/if}
</div>

<style>
	.hero-big-avatar {
		.frame {
			width: 240px;
			height: 440px;
			overflow: hidden;

			img {
				height: 100%;
			}
		}
	}
</style>
