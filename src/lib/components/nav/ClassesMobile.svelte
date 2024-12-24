<script lang="ts">
import { CLASS } from '$lib';
import SvgIcon from '$lib/components/SvgIcon.svelte';
import { page } from '$app/state';

let currentClass = $derived(page.url.searchParams.get('class') || CLASS.ALL);

let currentRoute = $derived(page.route.id || '');
</script>

<nav
	class="top_nav_mobile fixed left-0 top-0 z-50 flex h-7 w-full bg-[var(--dark-blue)] text-[var(--white)] md:hidden"
	class:hidden={currentRoute !== '/'}
>
	<ul class="flex w-full h-full">
		<li class="flex w-1/4 items-center justify-center" class:active={currentClass === CLASS.ALL}>
			<a href="/?class={CLASS.ALL}"
			><SvgIcon icon="CLASS_ALL" active={currentClass === CLASS.ALL} /></a
			>
		</li>
		<li
			class="flex w-1/4 items-center justify-center"
			class:active={currentClass === CLASS.VANGUARD}
		>
			<a href="/?class={CLASS.VANGUARD}"
			><SvgIcon icon="CLASS_VANGUARD" active={currentClass === CLASS.VANGUARD} /></a
			>
		</li>
		<li
			class="flex w-1/4 items-center justify-center"
			class:active={currentClass === CLASS.DUELIST}
		>
			<a href="/?class={CLASS.DUELIST}"
			><SvgIcon icon="CLASS_DUELIST" active={currentClass === CLASS.DUELIST} /></a
			>
		</li>
		<li
			class="flex w-1/4 items-center justify-center"
			class:active={currentClass === CLASS.STRATEGIST}
		>
			<a href="/?class={CLASS.STRATEGIST}"
			><SvgIcon icon="CLASS_STRATEGIST" active={currentClass === CLASS.STRATEGIST} /></a
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