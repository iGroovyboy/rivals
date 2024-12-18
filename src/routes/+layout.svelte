<script lang="ts">
	import '../app.css';
	import { CLASS } from '$lib';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { restoreStore } from '$lib/store.svelte';

	let { children } = $props();

	let currentClass = $derived($page.url.searchParams.get('class') || "");
	
	onMount(() => { 
		restoreStore();
	})
</script>

<div class="bg -z-10"></div>

<nav class="flex w-full justify-between overflow-hidden z-50">
	<div class="title w-1/12 mx-2 flex justify-center">[R-C-P]</div>
	<div class="menu px-6 w-11/12 flex flex-row justify-between">
		<div class="start">
			<ul class="flex flex-row gap-x-6">
				<li>
					<a class="capitalize" class:active={currentClass === CLASS.ALL} href="/?class={CLASS.ALL}">{CLASS.ALL}</a>
				</li>
				<li>
					<a class="capitalize" class:active={currentClass === CLASS.VANGUARD} href="/?class={CLASS.VANGUARD}">{CLASS.VANGUARD}</a>
				</li>
				<li>
					<a class="capitalize" class:active={currentClass === CLASS.DUELIST} href="/?class={CLASS.DUELIST}">{CLASS.DUELIST}</a>
				</li>
				<li>
					<a class="capitalize" class:active={currentClass === CLASS.STRATEGIST} href="/?class={CLASS.STRATEGIST}">{CLASS.STRATEGIST}</a>
				</li>
			</ul>
		</div>
		<div class="end">
			<ul class="flex flex-row gap-x-6">
				<li>
					<a href="/suggest">Suggest</a>
				</li>
				<li>
					<a href="/fav">Favorites</a>
				</li>
				<li>
					<a href="/about">?</a>
				</li>
			</ul>
		</div>
	</div>
</nav>

<div class="wrapper pt-8 w-9/12 mx-auto z-0">
	{@render children()}
</div>

<style>
	.bg {
		background-color: var(--light-blue);
		position: fixed;
		width: 95vw;
		height: 100vh;
		transform: skewX(-10deg) translateX(4vw);
		pointer-events: none;
	}

	nav {
		position: fixed;
		width: 100%;
		height: 70px;
		background-color: var(--black);
		color: var(--white);

		a.active {
				color: var(--highlight);
		}
	}
</style>