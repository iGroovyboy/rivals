<script lang="ts">
	let { checked, onclick } = $props();

	let fill = $derived(checked ? 'var(--highlight)' : 'transparent');
</script>

<button aria-label="Toggle Favorite" onclick={onclick} class="star drop-shadow-lg opacity-90 hover:opacity-100" title="Toggle Favorite">
	<svg class="ionicon opacity-60 hover:opacity-100" viewBox="0 0 512 512"
		><path
			d="M480 208H308L256 48l-52 160H32l140 96-54 160 138-100 138 100-54-160z"
			fill={fill}
			stroke="currentColor"
			stroke-linejoin="round"
			stroke-width="32"
		/></svg
	>
</button>

<style>
	svg {
		inline-size: 1rem;
	}
</style>
