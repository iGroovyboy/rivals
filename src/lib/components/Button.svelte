<script lang="ts">
	interface Props {
		disabled: boolean;
		onclick: () => void;
		classes: string;
		type: string;
	}

	let { children, disabled, onclick, type = 'button', classes = '' } = $props<Props>();
</script>

<button
	{onclick}
	{disabled}
	class:disabled
	class="border-2 border-[var(--dark-blue)] bg-[var(--white)] px-12 text-[var(--dark-blue)] {classes}"
	{type}
>
	{@render children()}
</button>

<style>
	.disabled {
		background-color: var(--light-grey);
		opacity: 0.4;
	}
</style>
