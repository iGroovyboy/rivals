<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { toast, TOAST_COLOR } from '$lib/toasts.svelte';
	import { supabaseGetUser } from '$lib/auth.svelte';
	import { onMount } from 'svelte';
	import type { User } from '@supabase/supabase-js';
	
	let user = $state<User | null>(null);

	let formData = $state({
		name: '',
		email: '',
		message: '',
		_honey: ''
	});

	let isSending = $state(false);

	let canSubmit = $derived(!isSending && formData.email.length && formData.message.length);

	const sendMessage = () => {
		if (formData._honey.length) {
			console.log('honey detected');
			return;
		}

		isSending = true;

		fetch('https://formsubmit.co/ajax/db6dcf648cb7e4e534907e8e4de0c4e8', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				_subject: 'Rivals: new message',
				name: formData.name,
				email: formData.email,
				message: formData.message
			})
		})
			.then((response) => response.json())
			.then(() => toast('Your message has been sent'))
			.catch((error) => {
				console.log(error);
				toast('Your message was not sent!', TOAST_COLOR.RED);
			})
			.finally(() => (isSending = false));
	};

	onMount(async () => {
		user = await supabaseGetUser();

		if (user) {
			formData.name = user.user_metadata.full_name;
			formData.email = user.email || '';
		}
	})
</script>

<h1>Contact Us</h1>

<p class="text-xs">Feel free to ask questions, give us your feedback or ideas to improve.</p>

<div class="mx-0.5 mb-16 flex flex-col gap-y-1 md:mx-auto">
	<input type="hidden" name="_subject" value="Rivals: new message!" />

	<div class="flex flex-col md:flex-row">
		<label class="w-full min-w-16 md:w-1/12" for="name">Your name</label>
		<input
			bind:value={formData.name}
			class="w-full px-1 md:w-6/12"
			id="name"
			name="name"
			type="text"
		/>
	</div>

	<div class="flex flex-col md:flex-row">
		<label class="w-full min-w-16 md:w-1/12" for="email">Your Email</label>
		<input
			bind:value={formData.email}
			class="w-full px-1 md:w-6/12"
			id="email"
			name="email"
			type="email"
			required
		/>
	</div>

	<div class="flex flex-col md:flex-row">
		<label class="w-full min-w-16 md:w-1/12" for="message">Message</label>
		<textarea
			bind:value={formData.message}
			class="w-full px-1 md:w-6/12"
			id="message"
			name="message"
			required
		></textarea>
	</div>

	<input type="text" name="_honey" style="display:none" />

	<div class="flex w-full">
		<Button onclick={sendMessage} disabled={!canSubmit} classes="w-full md:w-auto">Submit</Button>
	</div>
</div>
