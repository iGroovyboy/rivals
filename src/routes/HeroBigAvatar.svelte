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
			transform: skewY(-5deg);
			background: rgb(233,233,233);
			background: linear-gradient(0deg, rgba(233,233,233,1) 0%, rgba(228,228,228,1) 67%, rgba(255,255,255,1) 100%);

			img {
					height: 200%;
					object-fit: cover;
			}
		}
	}
</style>