<script>
	import BannerButton from './BannerButton.svelte';
	import ControlsBar from '$lib/components/ControlsBar.svelte';
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
	import Seo from '$lib/components/Seo.svelte';
	import { goto } from '$app/navigation';

	let isAbout = $state(true);
</script>

<Seo
	title="About"
	description="Learn more about Marvel Rivals Counterpicks, our mission, how we support players and how you can support us!"
/>

<h1><strong>About</strong> Marvel Rivals Counterpicks</h1>

<ControlsBar gap="0">
	<button onclick={() => (isAbout = true)} class:active={isAbout} class="px-2 text-sm uppercase">
		{$_('about.about')}
	</button>
	<button onclick={() => (isAbout = false)} class:active={!isAbout} class="px-2 text-sm uppercase">
		{$_('about.help')}
	</button>
	<button onclick={() => goto(base + '/contact')} class="px-2 text-sm uppercase">
		Contact
	</button>
</ControlsBar>

{#if isAbout}
	<article class="about flex flex-col">
		<section>
			<h2>{$_('about.disclaimer')}</h2>
			<p class="text-xs">{$_('about.discl_descr')}</p>
		</section>

		<section>
			<h2>Privacy policy</h2>
			<a class="text-indigo-500 font-semibold" href="{base}/privacy-policy">View</a>
		</section>

		<section>
			<p>{$_('about.h_donations')}</p>
			<div class="flex items-center">
				<BannerButton baseColor="#ffbb00" href="https://donatello.to/groovyboy"
					>{$_('about.donate')}</BannerButton
				>
				<BannerButton baseColor="#ffffff" pos="center" href="https://donatello.to/groovyboy"
					><img
						class="h-16 w-16"
						src="{base}/img/qr_donatello_to_groovyboy.svg"
						alt="Donation Qr Code"
					/></BannerButton
				>
			</div>
		</section>

		<section>
			<p>{$_('about.h_tech')}</p>
			<div class="flex">
				<BannerButton baseColor="#ff0000ff" href="https://svelte.dev">SVELTE 5</BannerButton>
				<BannerButton baseColor="#3ccf8e" href="https://supabase.com">Supabase</BannerButton>
			</div>
		</section>
	</article>
{:else}
	<article class="help flex flex-col">Some basic help will be here someday.</article>
{/if}

<style>
	button.active {
		background: var(--highlight);
		color: var(--black);
	}

	section {
		@apply mb-4;
	}
</style>
