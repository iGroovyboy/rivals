<script lang="ts">
	let { classname, color } = $props();
</script>

<div class="classname-avatar flex items-center justify-center md:min-h-[96px] bg-[var(--dark-blue)] ">
	<div class="frame w-4 h-4 md:w-[48px] md:h-[48px]">
		<img src="/icons/class/{classname}.webp" alt="{classname} icon">
	</div>
</div>

<style>

</style>