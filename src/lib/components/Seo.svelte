<script>
	import { page } from '$app/state';

	let { title, description } = $props();

	const domain = 'igroovyboy.github.io/rivals/';
	const host = 'https://igroovyboy.github.io/rivals/';
	const currentRoute = host + page.url.pathname.toString().replace('/', '');
	const image = host + '/img/screenshot.png';
	const name = 'Marvel Rivals Counterpicks';
</script>

<svelte:head>
	<title>{title} | {name}</title>
	<meta name="description" content={description} />
	<meta property="og_site_name" content={host} />
	<meta property="og:url" content={currentRoute} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content={domain} />
	<meta property="twitter:url" content={currentRoute} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
	{@html `  <script type="application/ld+json">{
   "@context": "https://schema.org",
   "@type": "Website",
   "name": "${title} | ${name},
   "url": "${currentRoute}",
   "logo": ${image}  }</script>`}
</svelte:head>
