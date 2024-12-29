<script lang="ts">
import { CLASS } from '$lib';
import SvgIcon from '$lib/components/SvgIcon.svelte';
import { page } from '$app/state';
import { useStore } from '$lib/store.svelte';

let currentClass = $derived(useStore.currentClass);

let currentRoute = $derived(page.route.id || '');
</script>

<nav
	class="top_nav_mobile fixed left-0 top-0 z-50 flex h-7 w-full bg-[var(--dark-blue)] text-[var(--white)] md:hidden"
	class:hidden={currentRoute !== '/'}
>
	<ul class="flex w-full h-full" data-cl={currentClass}>
		<li class="flex w-1/4 items-center justify-center" class:active={currentClass === CLASS.ALL}>
			<button class="flex justify-center w-full" onclick={() => useStore.currentClass = CLASS.ALL}
			><SvgIcon icon="CLASS_ALL" active={currentClass === CLASS.ALL} /></button
			>
		</li>
		<li
			class="flex w-1/4 items-center justify-center"
			class:active={currentClass === CLASS.VANGUARD}
		>
			<button class="flex justify-center w-full" onclick={() => useStore.currentClass = CLASS.VANGUARD}
			><SvgIcon icon="CLASS_VANGUARD" active={currentClass === CLASS.VANGUARD} /></button
			>
		</li>
		<li
			class="flex w-1/4 items-center justify-center"
			class:active={currentClass === CLASS.DUELIST}
		>
			<button class="flex justify-center w-full"onclick={() => useStore.currentClass = CLASS.DUELIST}
			><SvgIcon icon="CLASS_DUELIST" active={currentClass === CLASS.DUELIST} /></button
			>
		</li>
		<li
			class="flex w-1/4 items-center justify-center"
			class:active={currentClass === CLASS.STRATEGIST}
		>
			<button class="flex justify-center w-full" onclick={() => useStore.currentClass = CLASS.STRATEGIST}
			><SvgIcon icon="CLASS_STRATEGIST" active={currentClass === CLASS.STRATEGIST} /></button
			>
		</li>
	</ul>
</nav>

<style>
    nav {
        li.active {
						background-color: var(--highlight);
						color: var(--dark-blue);
        }
    }
</style>