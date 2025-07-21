<script>
	import { formData } from '$lib/store/mainStore';
	import { formJson } from '$lib/utils/questions';

	let visibleQuestions = 1;

	$: {
		console.log('Form Data Updated:', $formData, 'Visible Questions:', visibleQuestions);
		let nextIndex = visibleQuestions;
		while (nextIndex < formJson.steppers[0].length) {
			const nextQuestion = formJson.steppers[0][nextIndex];
			console.log(
				'Checking condition for',
				nextQuestion.fieldName,
				'Condition:',
				nextQuestion.condition
			);
			if (!nextQuestion.condition || evaluateCondition(nextQuestion.condition)) {
				visibleQuestions = nextIndex + 1;
				console.log(
					'Showing question:',
					nextQuestion.fieldName,
					'Visible Questions set to:',
					visibleQuestions
				);
				break;
			}
			nextIndex++;
		}
	}

	function handleChange(fieldName, value) {
		formData.update((data) => {
			const newData = { ...data, [fieldName]: value };
			console.log('Updated formData:', newData);
			return newData;
		});
		const currentQuestionIndex = formJson.steppers[0].findIndex((q) => q.fieldName === fieldName);
		visibleQuestions = Math.max(currentQuestionIndex + 1, 1);
	}

	function evaluateCondition(condition) {
		const { rightOperand, operator, leftOperand } = condition;
		let result = false;

		if (typeof rightOperand === 'string') {
			const fieldValue = $formData[rightOperand] || '';
			if (operator === 'include') {
				result = Array.isArray(leftOperand) && leftOperand.includes(fieldValue);
			} else if (operator === '==') {
				result = fieldValue === leftOperand;
			}
		} else if (operator === 'OR') {
			result = evaluateCondition(rightOperand) || evaluateCondition(leftOperand);
		} else if (operator === 'AND') {
			result = evaluateCondition(rightOperand) && evaluateCondition(leftOperand);
		}

		console.log('Evaluating condition:', condition, 'Result:', result);
		return result;
	}

	function handleSubmit() {
		console.log('Form Submitted:', $formData);
		alert('Form submitted! Check console for data.');
	}
</script>

<main class="max-w-2xl mx-auto p-6">
	<h1 class="text-2xl font-bold mb-6">{formJson.formName}</h1>

	{#each formJson.steppers[0].slice(0, visibleQuestions) as question, index}
		{#if index === 0 || (question.condition && evaluateCondition(question.condition))}
			<div class="border p-4 rounded-lg mb-6">
				<h2 class="text-lg font-semibold">{question.question}</h2>
				<p class="text-gray-600 mb-4">{question.description}</p>

				{#if question.type === 'Radio'}
					<div class="space-y-2">
						{#each question.options as option}
							{#if !option.condition || evaluateCondition(option.condition)}
								<label class="flex items-center space-x-2">
									<input
										type="radio"
										name={question.fieldName}
										value={option.value}
										checked={$formData[question.fieldName] === option.value}
										on:change={(e) => handleChange(question.fieldName, e.currentTarget.value)}
										class="text-blue-500 focus:ring-blue-500"
									/>
									<span>{option.label}</span>
								</label>
							{/if}
						{/each}
					</div>
				{/if}

				{#if question.type === 'select'}
					<select
						class="w-full p-2 border rounded mt-2"
						bind:value={$formData[question.fieldName]}
						on:change={(e) => handleChange(question.fieldName, e.target.value)}
					>
						<option value="" disabled>{question.placeholder || 'Select an option'}</option>

						{#each question.options as option}
							{#if !option.condition || evaluateCondition(option.condition)}
								<option value={option.value}>{option.label}</option>
							{/if}
						{/each}
					</select>
				{/if}
			</div>
		{/if}
	{/each}

	{#if visibleQuestions >= formJson.steppers[0].length || (visibleQuestions > 1 && formJson.steppers[0][visibleQuestions] && !evaluateCondition(formJson.steppers[0][visibleQuestions].condition))}
		<div class="mt-6 flex justify-end">
			<button
				class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
				on:click={handleSubmit}
			>
				Submit
			</button>
		</div>
	{/if}

	<pre class="mt-4 text-sm">{JSON.stringify($formData, null, 2)}</pre>
</main>
