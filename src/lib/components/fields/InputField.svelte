<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Question } from '$lib/utils/type';

  export let q: Question;
  export let value: string | number = '';
  export let errors: Record<string, string> = {};
  export let type: 'text' | 'number' | 'email' | 'password' | 'tel' = 'text';

  const dispatch = createEventDispatcher();
  const handleChange = (e: Event) => {
    const val = (e.target as HTMLInputElement).value;
    dispatch('change', type === 'number' ? Number(val) : val);
  };
</script>

<div class="mb-4">
  <label for={q.fieldName} class="block font-semibold">{q.question}</label>
  {#if q.description}
    <p class="text-sm text-gray-500">{q.description}</p>
  {/if}

  <input
    id={q.fieldName}
    placeholder={q.placeholder ?? ''}
    type={type}
    bind:value={value}
    on:input={handleChange}
    class="w-full p-2 border border-gray-300 rounded mt-2"
  />

  {#if errors[q.fieldName]}
    <p class="text-sm text-red-500 mt-1">{errors[q.fieldName]}</p>
  {/if}
</div>
