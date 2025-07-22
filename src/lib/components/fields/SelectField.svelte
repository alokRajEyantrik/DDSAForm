<script>
	export let question;
	export let formData;
	export let onChange;
	export let evaluateCondition;
	export let fieldOrigins;

	let localValue = '';

	$: {
		localValue =
			fieldOrigins[question.fieldName] === formData['typeOfLoan']
				? (formData[question.fieldName] ?? '')
				: '';
	}

	function handleChange(e) {
		localValue = e.target.value;
		onChange(question.fieldName, localValue);
	}
</script>

<select class="w-full p-2 border rounded" bind:value={localValue} on:change={handleChange}>
	<option value="" disabled>Select an option</option>

	{#each question.options as option}
		{#if !option.condition || evaluateCondition(option.condition, formData)}
			<option value={option.value}>{option.label}</option>
		{/if}
	{/each}
</select>
