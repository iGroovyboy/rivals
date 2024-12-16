<script lang="ts">
	let { filename, name, classname } = $props();
</script>

<div class="classname-avatar">
	<div class="frame w-[96px] h-[96px] bg-cyan-200">
		<img src="/icons/{classname}/{filename}" alt={name}>
	</div>
</div>

