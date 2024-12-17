<script lang="ts">
	import type { Classname } from '$lib';

	interface Props {
		name: string;
		classname: Classname;
		onclick: () => void;
		selected: boolean;
	}
	let { name, classname, onclick, selected } = $props<Props>();

	const iconFilename = (name: string): string => {
		return name?.toLowerCase().replaceAll(' ', '_').replaceAll('&', 'n') + '_icon.webp';
	};
</script>

<div class="hero-avatar">
	<button
		class:selected
		class="frame flex h-[96px] w-[99px] cursor-pointer items-center border-[var(--dark-blue)] bg-transparent hover:border-y-2"
		{onclick}
	>
		<img class="w-full" src="/icons/{classname}/{iconFilename(name)}" alt={name} />
	</button>
</div>

<style>
	.selected {
			border: 5px solid var(--dark-blue);
      background-color: var(--highlight);
	}
</style>
