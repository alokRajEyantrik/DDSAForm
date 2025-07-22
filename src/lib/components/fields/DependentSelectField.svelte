<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Question } from '$lib/utils/type';

  export let q: Question;
  export let value: string;
  export let parentValue: string;  // e.g. selected "state"
  export let errors: Record<string, string> = {};

  const dispatch = createEventDispatcher();

  const optionsByParent = q.options?.filter((opt) => opt.parentValue === parentValue);

  const handleChange = (e: Event) => {
    dispatch('change', (e.target as HTMLSelectElement).value);
  };
</script>

<div class="mb-4">
  <label for="" class="block font-semibold">{q.question}</label>

  <select
    bind:value={value}
    on:change={handleChange}
    class="w-full p-2 border border-gray-300 rounded mt-2"
    disabled={!parentValue}
  >
    <option value="" disabled selected>{q.placeholder ?? 'Select...'}</option>

    {#each optionsByParent ?? [] as option}
      <option value={option.value}>{option.label}</option>
    {/each}
  </select>

  {#if errors[q.fieldName]}
    <p class="text-sm text-red-500 mt-1">{errors[q.fieldName]}</p>
  {/if}
</div>
