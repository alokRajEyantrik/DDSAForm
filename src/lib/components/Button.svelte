<script lang="ts">
  export let btnName: string = "Click Me";
  export let type: "button" | "submit" | "reset" = "button";
  export let disabled: boolean = false;
  export let className: string = "";
</script>

<button
  type={type}
  disabled={disabled}
  class={`px-4 py-2 text-white font-semibold rounded-lg shadow-md bg-[#5570F1] hover:bg-[#5B6EC6] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
  on:click
>
  <slot>{btnName}</slot>
</button>
