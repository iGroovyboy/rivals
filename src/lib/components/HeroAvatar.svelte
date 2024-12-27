<script lang="ts">
	import type { Classname } from '$lib';
	import { base } from '$app/paths';

	interface Props {
		name: string;
		classname: Classname;
		onclick?: () => void;
		selected?: boolean;
		autosize?: boolean;
	}
	let { name, classname, onclick, selected, autosize } = $props<Props>();

	const iconFilename = (name: string): string => {
		return name?.toLowerCase().replaceAll(' ', '_').replaceAll('&', 'n') + '_icon.webp';
	};
</script>

<div class="hero-avatar">
	<button
		class:selected
		class:sized={!autosize}
		class="frame flex cursor-pointer items-center border-[var(--dark-blue)] bg-transparent hover:border-y-2"
		{onclick}
	>
		<img class="w-full" src="{base}/icons/{classname}/{iconFilename(name)}" alt={name} />
	</button>
</div>

<style>
	.selected {
			border: 5px solid var(--dark-blue);
      background-color: var(--highlight);
	}
	.sized {
			width: 99px;
			height: 96px;
	}
</style>
