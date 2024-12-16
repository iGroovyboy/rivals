<script lang="ts">
	let { filename, name, classname } = $props();
</script>

<div class="hero-big-avatar">
	<div class="frame">
		<img src="/icons/{classname}/{filename}" alt={name} />
	</div>
</div>

<style>
	.hero-big-avatar {
		.frame {
			width: 240px;
			height: 440px;
			overflow: hidden;

			img {
				height: 100%;
			}
		}
	}
</style>
