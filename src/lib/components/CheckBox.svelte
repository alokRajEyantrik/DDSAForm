<script>
  export let checked = false;
  export let checkLabel = "Check me";
</script>

<label class="flex items-center gap-2 cursor-pointer select-none">
  <!-- Hidden Native Checkbox -->
  <input type="checkbox" bind:checked id={checkLabel} class="sr-only peer" />

  <div
    class="w-4 h-4 rounded border {!checked
      ? 'border-[#83898C]'
      : 'border-[#2B2F32]'}  flex items-center justify-center
         transition-all peer-checked:bg-[#5570F1] peer-checked:border-[#6D7DCD]
        "
  >
    {#if checked}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-3 h-3 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    {/if}
  </div>

  <!-- Label Text -->
  <span class={!checked ? "text-[#83898C]" : "text-[#2B2F32]"}
    >{checkLabel}</span
  >
</label>
