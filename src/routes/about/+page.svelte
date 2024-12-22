<script>
	import BannerButton from './BannerButton.svelte';

	let isAbout = $state(true);
</script>

<div class="mb-4 mt-4 h-6 w-full flex-col 2xl:w-8/12">
	<div
		class="bg absolute -left-1 z-0 h-6 w-full min-w-10 -skew-x-12 bg-[var(--black)] xl:w-8/12"
	></div>

	<div class="relative z-10 flex h-6 w-full text-[var(--white)]">
		<button onclick={() => (isAbout = true)} class:active={isAbout} class="px-2 text-sm uppercase">
			ABOUT
		</button>
		<button
			onclick={() => (isAbout = false)}
			class:active={!isAbout}
			class="px-2 text-sm uppercase"
		>
			HELP
		</button>
	</div>
</div>

{#if isAbout}
	<article class="about flex flex-col">
		<section>
			<h2>Disclaimer:</h2>
			<p class="text-xs">
				This site is a fan-created resource dedicated to <strong>Marvel Rivals</strong> and is not affiliated
				with or endorsed by Marvel, Marvel Entertainment, or any associated entities. All trademarks,
				logos, and images related to Marvel Rivals are the property of their respective owners. This
				site is for informational and entertainment purposes only and operates as a free, unofficial
				fan project. If you have concerns, please contact us.
			</p>
		</section>

		<section>
			<p>This is an open source project. Please consider supporting by donations:</p>
			<div class="flex items-center">
				<BannerButton baseColor="#ffbb00" href="https://donatello.to/groovyboy">Donate</BannerButton
				>
				<BannerButton baseColor="#ffffff" pos="center" href="https://donatello.to/groovyboy"
					><img
						class="h-16 w-16"
						src="/img/qr_donatello_to_groovyboy.svg"
						alt="Donation Qr Code"
					/></BannerButton
				>
			</div>
		</section>

		<section>
			<p>Technologies used:</p>
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
