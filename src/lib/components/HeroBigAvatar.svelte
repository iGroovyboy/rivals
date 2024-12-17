<script lang="ts">
	let { name, classname } = $props();

	const iconFilename = (name: string): string => {
		return name?.toLowerCase().replaceAll(' ', '_').replaceAll('&', 'n') + '.png';
	};
</script>

<div class="hero-big-avatar">
	<div class="frame">
		<img src="/icons/{classname}/{iconFilename(name)}" alt={name} />
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
