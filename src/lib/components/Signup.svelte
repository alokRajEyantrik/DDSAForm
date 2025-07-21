<script lang="ts">
	import Button from './Button.svelte';
	import CheckBox from './CheckBox.svelte';
	import InputField from './InputField.svelte';
	import SelectField from './SelectField.svelte';

	const formData = {
		firstName: '',
		lastName: '',
		mobileNumber: '',
		selectedCity: '',
		isChecked: false
	};

	async function submitForm(event: Event) {
		event.preventDefault();

		try {
			const response = await fetch('https://ddsa-api-1.onrender.com/submit', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});

			if (!response.ok) {
				throw new Error('Failed to submit form');
			}

			alert('Form submitted successfully!'); // Reset fields

			formData.firstName = '';
			formData.lastName = '';
			formData.mobileNumber = '';
			formData.selectedCity = '';
			formData.isChecked = false;
		} catch (error) {
			console.error('❌ Error submitting form:', error);
			alert('Something went wrong while submitting the form.');
		}
	}
</script>

<section
	class="max-w-[500px] min-w-[320px] mx-auto flex justify-center bg-white text-black rounded-lg shadow-lg"
>
	<div class="flex flex-col items-center justify-center w-full gap-4 p-6">
		<div class="flex flex-start w-full">
			<h1 class="text-2xl font-medium text-start">Create an Account</h1>
		</div>
		<form class="w-full flex flex-col gap-4" method="POST" onsubmit={submitForm}>
			<InputField
				label="First Name"
				placeholder="Enter your first name"
				bind:value={formData.firstName}
				errorMsg={formData.firstName === '' ? 'First name is required' : ''}
				imageSrc="/profile.svg"
				imageAlt="profile-icon"
			/>
			<InputField
				label="Last Name"
				placeholder="Enter your last name"
				bind:value={formData.lastName}
				errorMsg={formData.lastName === '' ? 'Last name is required' : ''}
				imageSrc="/profile.svg"
				imageAlt="profile-icon"
			/>

			<InputField
				label="Mobile Number"
				placeholder="9452XXXXXX"
				bind:value={formData.mobileNumber}
				errorMsg={formData.mobileNumber === '' ? 'Mobile Number is required' : ''}
				imageSrc="/profile.svg"
				imageAlt="profile-icon"
			/>

			<SelectField
				label="Select City"
				placeholder="Choose a city"
				bind:value={formData.selectedCity}
				imageSrc="/profile.svg"
				errorMsg={formData.selectedCity === '' ? 'City is required' : ''}
			>
				<option value="delhi">Delhi</option>
				<option value="mumbai">Mumbai</option>
				<option value="bangalore">Bangalore</option>
			</SelectField>

			<CheckBox
				bind:checked={formData.isChecked}
				checkLabel="I agree to the terms and conditions"
			/>

			<Button btnName="Submit" type="submit" />
		</form>
	</div>
</section>
