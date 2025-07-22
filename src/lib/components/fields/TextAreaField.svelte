<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Question } from '$lib/utils/type';

	export let q: Question;
	export let value: string = '';
	export let errors: Record<string, string> = {};

	const dispatch = createEventDispatcher();
	const handleChange = (e: Event) => dispatch('change', (e.target as HTMLTextAreaElement).value);
</script>

<div class="mb-4">
	<label for="" class="block font-semibold">{q.question}</label>
	{#if q.description}
		<p class="text-sm text-gray-500">{q.description}</p>
	{/if}

	<textarea
		bind:value
		rows="4"
		placeholder={q.placeholder ?? ''}
		on:input={handleChange}
		class="w-full p-2 border border-gray-300 rounded mt-2"
	></textarea>

	{#if errors[q.fieldName]}
		<p class="text-sm text-red-500 mt-1">{errors[q.fieldName]}</p>
	{/if}
</div>
