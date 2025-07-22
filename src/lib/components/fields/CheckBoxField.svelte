<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Question } from '$lib/utils/type';

  export let q: Question;
  export let value: boolean = false;
  export let errors: Record<string, string> = {};

  const dispatch = createEventDispatcher();

  const handleChange = (e: Event) => {
    dispatch('change', (e.target as HTMLInputElement).checked);
  };
</script>

<div class="mb-4">
  <label class="flex items-center gap-2 font-medium">
    <input
      type="checkbox"
      checked={value}
      on:change={handleChange}
    />
    {q.question}
  </label>

  {#if q.description}
    <p class="text-sm text-gray-500">{q.description}</p>
  {/if}

  {#if errors[q.fieldName]}
    <p class="text-sm text-red-500">{errors[q.fieldName]}</p>
  {/if}
</div>
