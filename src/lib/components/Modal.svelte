<script>
  export let open = false;
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function closeModal() {
    dispatch('close');
  }
</script>

{#if open}
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 transition-opacity">
    <div class="relative bg-white rounded-xl shadow-lg max-w-md w-full mx-4 p-6 sm:p-10 flex flex-col items-center">
      <button
        class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 focus:outline-none"
        aria-label="Close"
        on:click={closeModal}
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <svg class="w-16 h-16 text-orange-500 mb-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" />
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2l4-4" />
      </svg>
      <h2 class="text-2xl font-semibold text-gray-800 mb-2 text-center">Form Submitted!</h2>
      <p class="text-gray-500 text-center mb-4">
        Thank you for your submission. We have received your information.
      </p>
      <button
        class="mt-4 px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition font-medium"
        on:click={closeModal}
      >
        Close
      </button>
    </div>
  </div>
{/if}
