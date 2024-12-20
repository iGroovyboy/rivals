<script lang="ts">
	import Button from '$lib/components/Button.svelte';

	let { user, onLogout } = $props();
</script>

<div class="profile flex flex-col gap-y-2 bg-[var(--black)] p-2 text-xs text-[var(--white)]">
	<div class="">
		<span class="text-[var(--light-grey)]">Email:</span>
		{user.email}
	</div>
	<div class="">
		<span class="text-[var(--light-grey)]">Name:</span>
		{user.user_metadata.full_name}
	</div>
	<Button onclick={onLogout}>Log out</Button>
</div>
