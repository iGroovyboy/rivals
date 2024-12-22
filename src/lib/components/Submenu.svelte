<script lang="ts">
	let { children } = $props();
</script>

<div class="profile flex flex-col gap-y-2 bg-[var(--black)] p-2 text-xs text-[var(--white)]">
	{@render children()}
</div>