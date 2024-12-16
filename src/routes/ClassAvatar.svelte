<script lang="ts">
	let { classname, color } = $props();
</script>

<div class="classname-avatar flex items-center justify-center h-[96px] bg-blue-400 ">
	<div class="frame w-[48px] h-[48px]">
		<img src="/icons/class/{classname}.webp" alt="{classname} icon">
	</div>
</div>

<style>

</style>