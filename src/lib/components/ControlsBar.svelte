<script lang="ts">
	let { children, gap = '3' } = $props();
</script>

<div class="mb-4 mt-4 h-6 w-full 2xl:w-8/12">
	<div
		class="bg absolute -left-1 z-0 h-6 w-full min-w-10 -skew-x-12 bg-[var(--black)] xl:w-8/12"
	></div>

	<div class="relative z-10 flex h-6 w-full gap-x-{gap} text-[var(--white)]">
		{@render children()}
	</div>
</div>
