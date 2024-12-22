<script lang="ts">
	import { lightenColor } from '$lib/helpers';

	let { children, href, pos = 'start', baseColor = '#CDCDCD' } = $props();

	let backgroundColor = $derived(
		`linear-gradient(160deg,${lightenColor(baseColor, 60)} 40%, ${baseColor} 60%)`
	);

	const onclick = () => {
		window.open(href, '_blank');
	};
</script>

<button {onclick} style:--bg={backgroundColor} style:--hover={baseColor} style:--pos={pos}>
	{@render children()}
</button>

<style>
	button {
		width: 8rem;
		min-height: 4rem;
		border: 4px solid white;
		transform: skewX(-12deg);
		margin: 0.2rem;
		background: var(--bg);
		font-weight: 600;
		color: var(--white);
		display: flex;
		align-items: end;
		justify-content: var(--pos);
		padding-left: 15px;

		&:hover {
			border-color: var(--hover);
		}

		&:active {
			background: var(--hover);
		}
	}
</style>
