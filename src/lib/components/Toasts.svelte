<script lang="ts">
	import { removeToast, useToasts } from '$lib/toasts.svelte';

	const close = (id) => {
		removeToast(id);
	};
</script>

<div
	class="toasts pointer-events-none fixed bottom-0 flex w-full flex-col items-end gap-y-1 p-2"
>
	{#each useToasts.toasts as toast}
		<div
			class="toast pointer-events-auto flex w-fit -skew-x-12 cursor-pointer items-center toast-{toast.color} opacity-90 px-2 py-0.5 text-xs text-white drop-shadow-lg"
		>
			{@html toast.content}
			<button
				onclick={close(toast.id)}
				class="close border-1 ml-2 h-3 w-3 border border-black bg-white"
				aria-label="Close toast"
			></button>
		</div>
	{/each}
</div>

<style>
	.close {
		cursor: pointer;
		background-image: url(/icons/close-outline.svg);
	}
	.toast-green {
			background-color: #069106;
	}
	.toast-red {
			background-color: red;
	}
	.toast-orange {
			background-color: #dc6e00;
	}
</style>
