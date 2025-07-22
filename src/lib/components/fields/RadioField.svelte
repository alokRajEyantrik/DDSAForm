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

	function handleChange(value) {
		localValue = value;
		onChange(question.fieldName, value);
	}
</script>

<div class="space-y-2">
	{#each question.options as option}
		{#if !option.condition || evaluateCondition(option.condition, formData)}
			<label class="flex gap-2 items-center">
				<input
					type="radio"
					name={question.fieldName}
					value={option.value}
					checked={option.value === localValue}
					on:change={() => handleChange(option.value)}
				/>
				{option.label}
			</label>
		{/if}
	{/each}
</div>
