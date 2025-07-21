<script lang="ts">
	export let btnName: string = 'Click Me';
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let disabled: boolean = false;
	export let loading: boolean = false;
	export let className: string = '';
</script>

<button
	{type}
	disabled={disabled || loading}
	class={`px-4 py-2 text-white font-semibold rounded-lg shadow-md bg-[#5570F1] hover:bg-[#5B6EC6] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${className}`}
>
	{#if loading}
		<svg
			class="animate-spin h-5 w-5 text-white"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
		>
			<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
			<path
				class="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
			/>
		</svg> <span>Submitting...</span>
	{:else}
		<slot>{btnName}</slot>
	{/if}
</button>
