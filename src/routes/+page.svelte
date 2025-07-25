<script>
	import { writable, get } from 'svelte/store';
	import { formJson } from '$lib/data/questions';
	import jsonLogic from 'json-logic-js';
	import Modal from '$lib/components/Modal.svelte';
	import { decrypt, encrypt } from '$lib/encryption';
	import { requestCameraPermission, requestLocationPermission } from '$lib/permissions';
	import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
	import { getCurrentPosition } from '$lib/location';

	let isSubmitting = false;
	let modalOpen = false;
	let formData = writable({});
	const currentStep = writable(0);

	let visibleQuestions = 1;

	// Logic to determine whether a question should be shown
	function shouldShow(question) {
		if (!question.showWhen) return true;
		return jsonLogic.apply(question.showWhen, $formData);
	}

	// Watch reactive updates
	$: {
		console.log('Form Data:', $formData);
		let nextIndex = visibleQuestions;

		while (nextIndex < formJson.steppers[$currentStep].length) {
			const nextQuestion = formJson.steppers[$currentStep][nextIndex];
			if (!nextQuestion.showWhen || shouldShow(nextQuestion)) {
				visibleQuestions = nextIndex + 1;
				break;
			}
			nextIndex++;
		}
	}

	function handleChange(fieldName, value) {
		formData.update((data) => {
			const updated = { ...data, [fieldName]: value };
			console.log(updated, 'iupdateeddd');
			return updated;
		});

		const index = formJson.steppers[$currentStep].findIndex((q) => q.fieldName === fieldName);
		visibleQuestions = Math.max(index + 1, 1);
	}

	function goBack() {
		if (get(currentStep) > 0) {
			currentStep.update((n) => n - 1);
		}
	}

	function goNext() {
		currentStep.update((n) => n + 1);
	}

	async function submitForm(event) {
		event.preventDefault();
		isSubmitting = true;

		try {
			const response = await fetch('https://ddsa-api-1.onrender.com/submit', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ formData: $formData })
			});

			if (!response.ok) {
				throw new Error('Failed to submit form');
			}

			// alert('Form submitted successfully!'); // Reset fields
			modalOpen = true;
		} catch (error) {
			console.error('❌ Error submitting form:', error);
			alert('Something went wrong while submitting the form.');
		} finally {
			isSubmitting = false; // Optionally, you can reset the form or handle post-submission logic here
		}
	}

	// async function secureProcess() {
	// 	let dataStr = JSON.stringify($formData);
	// 	const encrypted = await encrypt(dataStr);
	// 	console.log('Encrypted:', encrypted);

	// 	const decrypted = await decrypt(encrypted);
	// 	console.log('Decrypted:', decrypted);
	// }

	async function secureProcess() {
		encryptData();
		decryptData();
	}

	async function encryptData() {
		let dataStr = JSON.stringify($formData);
		const encrypted = await encrypt(dataStr);
		return encrypted;
	}

	async function decryptData() {
		let dataStr = JSON.stringify($formData);
		const decrypted = await decrypt(dataStr);
		return decrypted;
	}

	$: if ($formData) {
		// If you want to debounce or limit calls, implement logic here
		secureProcess();
	}

	let cameraGranted = false;
	$: capturedImage = null;

	// Call when user requests camera permission
	async function tryEnableCamera() {
		cameraGranted = await requestCameraPermission();
	}

	async function capturePhoto() {
		try {
			const photo = await Camera.getPhoto({
				quality: 80,
				allowEditing: false,
				resultType: CameraResultType.DataUrl,
				source: CameraSource.Camera
			});
			capturedImage = photo.dataUrl;
		} catch (error) {
			alert('Camera error or cancelled');
		}
	}

	let location = null;

	async function fetchLocation() {
		const granted = await requestLocationPermission();
		if (granted) {
			location = await getCurrentPosition();
			console.log('Location:', location);
		} else {
			alert('Location permission denied');
		}
	}
</script>

<main class="max-w-2xl mx-auto p-6">
	<Modal open={modalOpen} on:close={() => (modalOpen = false)} />
	<h1 class="text-2xl font-bold mb-6">
		{formJson.formName || 'Dynamic Loan Form'}
	</h1>

	{#each formJson.steppers[$currentStep].slice(0, visibleQuestions) as question, index}
		{#if index === 0 || shouldShow(question)}
			<div class="border p-4 rounded-lg mb-6">
				<h2 class="text-lg font-semibold">{question.question}</h2>
				<p class="text-gray-600 mb-4">{@html question.description}</p>

				{#if question.type === 'Radio'}
					<div class="space-y-2">
						{#each question.options.filter((opt) => !opt.showWhen || jsonLogic.apply(opt.showWhen, $formData)) as option}
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
						{/each}
					</div>
				{/if}

				{#if question.type === 'button' && jsonLogic.apply(question.showWhen, $formData)}
					<button type="button" class="btn btn-primary">
						{question.question}
					</button>
				{/if}
				{#if question.type === 'select'}
					<select
						class="w-full p-2 border rounded mt-2"
						bind:value={$formData[question.fieldName]}
						on:change={(e) => handleChange(question.fieldName, e.target.value)}
					>
						<option value="" disabled>
							{question.placeholder || 'Select an option'}
						</option>

						{#each question.options as option}
							<option value={option.value}>{option.label}</option>
						{/each}
					</select>
				{/if}
			</div>
		{/if}
	{/each}

	<div class="mt-6 flex justify-between">
		<!-- Back Button -->
		<button
			class={`px-4 py-2 ${$currentStep === 0 ? 'bg-gray-200' : 'bg-blue-500'} text-white rounded`}
			on:click={goBack}
			disabled={$currentStep === 0}
		>
			Back
		</button>

		<!-- Next or Submit Button -->
		{#if visibleQuestions >= formJson.steppers[$currentStep]?.length}
			<button
				class={`px-4 py-2 ${
					$currentStep >= formJson.steppers.length - 1 ? 'bg-orange-500' : 'bg-blue-500'
				} text-white rounded hover:bg-blue-600 flex items-center gap-2`}
				on:click={$currentStep >= formJson.steppers.length - 1 ? submitForm : goNext}
				disabled={isSubmitting}
			>
				{#if isSubmitting && $currentStep >= formJson.steppers.length - 1}
					<!-- Simple Spinner -->
					<svg
						class="animate-spin h-5 w-5 text-white"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
						></circle>
						<path
							class="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 010 16v4l-3.5-3.5L12 20v-4a8 8 0 01-8-8z"
						></path>
					</svg>
					Submitting...
				{:else}
					{$currentStep >= formJson.steppers.length - 1 ? 'Submit' : 'Next'}
				{/if}
			</button>
		{/if}
	</div>

	<!-- <button on:click={() => secureProcess()}>Decrypt</button> -->

	<div class="flex items-center gap-2 py-2">
		<button class="bg-blue-400 text-white p-2 rounded-md" on:click={() => encryptData()}
			>Encrypt</button
		>
		<button class="bg-orange-400 text-white p-2 rounded-md" on:click={() => decryptData()}
			>Decrypt</button
		>
	</div>
	<!-- Button to request permission -->
	{#if !cameraGranted}
		<button class="bg-red-400 text-white p-2 rounded-md" on:click={tryEnableCamera}
			>Allow Camera Permission</button
		>
	{/if}

	<!-- Capture button shown ONLY if permission granted -->
	<!-- {#if cameraGranted} -->
	<button class="bg-green-400 text-white p-2 rounded-md" on:click={capturePhoto}>Capture</button>
	<!-- {/if} -->

	<!-- Show image preview after capturing -->
	{#if capturedImage}
		<img src={capturedImage} alt="Captured " style="max-width: 300px;" />
	{/if}

	<button class="bg-purple-400 text-white p-2 rounded-md" on:click={fetchLocation}
		>Get Location</button
	>

	{#if location}
		<p>Latitude: {location.latitude}</p>
		<p>Longitude: {location.longitude}</p>
	{/if}

	<pre class="mt-4 text-sm bg-gray-100 p-4 rounded">{JSON.stringify($formData, null, 2)}</pre>
</main>
